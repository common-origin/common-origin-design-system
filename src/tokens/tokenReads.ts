import fs from 'fs'
import path from 'path'
import ts from 'typescript'

// Finds which design tokens source code reads, through the TypeScript type checker (#229).
//
// Every token group in `tokens.json`, and in the generated `Tokens` type, has its own object type,
// so a group keeps its identity however it travels: `tokens.semantic.color`, a destructure
// (`const { background: rowBackground } = color`), an alias, a parameter typed with
// `Tokens['semantic']['color']`, a helper's return value, or a property of an object literal. A
// read is a property access, element access or destructure on a value of one of those types.
//
// Keys are resolved from the code and the types: literals, template literals and `+` joins, and
// keys whose type is a union of literals (``category[`${hue}-subtle`]`` with `hue` a union).
//
// Nothing passes silently. Where a key can't be resolved, or a group leaves the type system (a
// cast, `Object.entries`, a parameter of another type, a container passed to `any`), the read
// counts as every token under that group, so it fails whenever it could reach a deprecated token.

export type TokenRead = {
  file: string
  line: number
  /** Every token path the read can reach */
  paths: string[]
  /** `exact` when the group and key are known; otherwise why the read was widened */
  how: 'exact' | 'unresolved key' | 'escape'
  /** The group or groups the read starts from ('' is the whole token set) */
  from: string[]
  /** For an escape into a call's argument, the called function's name */
  argumentOf?: string
}

export const ROOT = path.resolve(__dirname, '../..')
const TOKENS_TYPE = path.join(ROOT, 'src/types/tokens.ts')

/** Compiler options from the repo's tsconfig, and every file it includes */
export function projectConfig() {
  const { config } = ts.readConfigFile(path.join(ROOT, 'tsconfig.json'), ts.sys.readFile)
  return ts.parseJsonConfigFileContent(config, ts.sys, ROOT)
}

type Tree = {
  /** Group type → its path ('' is the root) */
  groups: Map<ts.Type, string>
  /** Group path → its children: true for a token, false for a group */
  children: Map<string, Map<string, boolean>>
}

function buildTree(checker: ts.TypeChecker, program: ts.Program): Tree {
  const tree: Tree = { groups: new Map(), children: new Map() }

  const walk = (type: ts.Type, at: string) => {
    tree.groups.set(type, at)
    const kids = tree.children.get(at) ?? new Map<string, boolean>()
    tree.children.set(at, kids)
    for (const property of checker.getPropertiesOfType(type)) {
      const child = checker.getTypeOfSymbol(property)
      const isGroup = (child.flags & ts.TypeFlags.Object) !== 0
      kids.set(property.name, !isGroup)
      if (isGroup) walk(child, at ? `${at}.${property.name}` : property.name)
    }
  }

  // `src/types/tokens.ts` declares `export const tokens: Tokens = tokensJson`, so one declaration
  // holds both types: the JSON module's (every `import tokens from '…/tokens.json'`) and the
  // published `Tokens` type (src/types/tokens, and parameters typed with it)
  const declaration = program
    .getSourceFile(TOKENS_TYPE)
    ?.statements.filter(ts.isVariableStatement)
    .flatMap((statement) => statement.declarationList.declarations)
    .find((d) => ts.isIdentifier(d.name) && d.name.text === 'tokens')
  if (!declaration?.initializer) throw new Error('tokenReads: src/types/tokens.ts declares no `tokens = tokensJson`')
  walk(checker.getTypeAtLocation(declaration.initializer), '')
  walk(checker.getTypeAtLocation(declaration.name), '')
  return tree
}

/** Every token path under a group */
function leavesUnder(tree: Tree, at: string): string[] {
  const kids = tree.children.get(at)
  if (!kids) return [at]
  return [...kids].flatMap(([key, leaf]) => {
    const child = at ? `${at}.${key}` : key
    return leaf ? [child] : leavesUnder(tree, child)
  })
}

/** The tokens directly in a group, without its nested groups */
function directLeaves(tree: Tree, at: string): string[] {
  return [...(tree.children.get(at) ?? [])].filter(([, leaf]) => leaf).map(([key]) => (at ? `${at}.${key}` : key))
}

const COMPARISONS = new Set([
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
  ts.SyntaxKind.InKeyword,
  ts.SyntaxKind.InstanceOfKeyword,
])
const LOGICAL = new Set([ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.AmpersandAmpersandToken])

export function findTokenReads(program: ts.Program, include: (file: ts.SourceFile) => boolean): TokenRead[] {
  const checker = program.getTypeChecker()
  const tree = buildTree(checker, program)
  const reads: TokenRead[] = []

  /** The token groups a type is (a group, or a union of groups) */
  const groupsOf = (type: ts.Type | undefined): string[] => {
    if (!type) return []
    const at = tree.groups.get(type)
    if (at !== undefined) return [at]
    return type.isUnion() ? [...new Set(type.types.flatMap(groupsOf))] : []
  }

  /** The token groups a type is or holds: in an object literal, an array, a tuple or a union */
  const within = new Map<ts.Type, string[]>()
  const groupsWithin = (type: ts.Type | undefined, seen = new Set<ts.Type>()): string[] => {
    if (!type || seen.has(type)) return []
    const cached = within.get(type)
    if (cached) return cached
    // Only a complete search is cached: one nested in another may have been cut short by a cycle
    const outermost = seen.size === 0
    seen.add(type)
    let found = groupsOf(type)
    if (!found.length) {
      if (type.isUnion() || type.isIntersection()) found = type.types.flatMap((t) => groupsWithin(t, seen))
      else if (type.flags & ts.TypeFlags.Object && type.getCallSignatures().length === 0) {
        const flags = (type as ts.ObjectType).objectFlags
        // Generic containers (arrays, tuples, Map, Promise, Record) hold groups in their type arguments
        // and index signatures
        if (flags & ts.ObjectFlags.Reference) found.push(...checker.getTypeArguments(type as ts.TypeReference).flatMap((t) => groupsWithin(t, seen)))
        found.push(...checker.getIndexInfosOfType(type).flatMap((info) => groupsWithin(info.type, seen)))
        // Object literals, type literals, and interfaces and classes declared in this project hold
        // them in properties. Library types (React's, the DOM's) are left alone.
        const declaredHere = (type.getSymbol()?.declarations ?? []).every((d) => !d.getSourceFile().isDeclarationFile)
        if (flags & (ts.ObjectFlags.ObjectLiteral | ts.ObjectFlags.Anonymous | ts.ObjectFlags.Mapped) || (declaredHere && type.getSymbol()))
          found.push(...checker.getPropertiesOfType(type).flatMap((p) => groupsWithin(checker.getTypeOfSymbol(p), seen)))
      }
    }
    found = [...new Set(found)]
    if (outermost) within.set(type, found)
    return found
  }

  /** Whether a target type keeps every group the value holds */
  const keeps = (target: ts.Type | undefined, groups: string[]) => {
    const kept = new Set(groupsWithin(target))
    return groups.every((group) => kept.has(group))
  }

  const literalsOf = (type: ts.Type): string[] | null => {
    if (type.isStringLiteral()) return [type.value]
    if (type.isNumberLiteral()) return [String(type.value)]
    if (type.flags & ts.TypeFlags.BooleanLiteral) return [checker.typeToString(type)]
    if (type.isUnion()) {
      const parts = type.types.map(literalsOf)
      return parts.every((part): part is string[] => part !== null) ? [...new Set(parts.flat())] : null
    }
    return null
  }

  /** Every string a key expression can produce, or null if it can't be pinned down */
  const keysOf = (node: ts.Expression): string[] | null => {
    if (ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node)) return keysOf(node.expression)
    if (ts.isStringLiteralLike(node)) return [node.text]
    if (ts.isNumericLiteral(node)) return [String(Number(node.text))]
    // A cast only widens: the expression inside it is the more precise source
    if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isTypeAssertionExpression(node)) {
      const inner = keysOf(node.expression)
      if (inner) return inner
    }
    if (ts.isTemplateExpression(node)) {
      let results = [node.head.text]
      for (const span of node.templateSpans) {
        const values = keysOf(span.expression)
        if (!values) return null
        results = results.flatMap((start) => values.map((value) => start + value + span.literal.text))
      }
      return results
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const [left, right] = [keysOf(node.left), keysOf(node.right)]
      return left && right ? left.flatMap((l) => right.map((r) => l + r)) : null
    }
    return literalsOf(checker.getTypeAtLocation(node))
  }

  const where = (node: ts.Node) => {
    const source = node.getSourceFile()
    return {
      file: path.relative(ROOT, source.fileName),
      line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1,
    }
  }

  /** A read of `keys` (null: any key) from `from` */
  const recordRead = (node: ts.Node, from: string[], keys: string[] | null) => {
    const paths = from.flatMap((group) => {
      const kids = tree.children.get(group)
      if (!kids) return []
      return (keys ?? [...kids.keys()])
        .filter((key) => kids.has(key))
        .flatMap((key) => {
          const child = group ? `${group}.${key}` : key
          // A group read with a known key keeps its type and is followed where it's used next.
          // With an unknown key the result's type is lost, so it reaches everything under it.
          return kids.get(key) ? [child] : keys === null ? leavesUnder(tree, child) : []
        })
    })
    reads.push({ ...where(node), paths: [...new Set(paths)], how: keys === null ? 'unresolved key' : 'exact', from })
  }

  const recordEscape = (node: ts.Expression | ts.BindingElement, groups: string[], paths: string[]) => {
    const parent = node.parent
    const call = ts.isCallExpression(parent) && parent.arguments.some((argument) => argument === node) ? parent : undefined
    const callee = call && (ts.isIdentifier(call.expression) ? call.expression.text : ts.isPropertyAccessExpression(call.expression) ? call.expression.name.text : undefined)
    reads.push({ ...where(node), paths: [...new Set(paths)], how: 'escape', from: groups, ...(callee ? { argumentOf: callee } : {}) })
  }

  // Whether a value holding token groups keeps them where it goes next. A position that hands the
  // value on unchanged, or into a type that holds the same groups, keeps them; anything else is an
  // escape, where the groups' types (and so their reads) are lost.
  const flowsOn = (node: ts.Expression, groups: string[]): boolean => {
    const parent = node.parent
    if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node) return true
    if (ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent)) return flowsOn(parent, groups)
    if (ts.isConditionalExpression(parent)) return parent.condition === node || flowsOn(parent, groups)
    if (ts.isBinaryExpression(parent)) {
      const op = parent.operatorToken.kind
      if (LOGICAL.has(op)) return flowsOn(parent, groups)
      // Comparisons and `in` read no tokens
      if (COMPARISONS.has(op)) return true
      if (op === ts.SyntaxKind.EqualsToken && parent.right === node) return keeps(checker.getTypeAtLocation(parent.left), groups)
    }
    if (ts.isVariableDeclaration(parent) && parent.initializer === node)
      return !ts.isIdentifier(parent.name) || keeps(checker.getTypeAtLocation(parent.name), groups)
    if (ts.isBindingElement(parent) && parent.initializer === node) return keeps(checker.getTypeAtLocation(parent.name), groups)
    if (ts.isForOfStatement(parent) && parent.expression === node) return true
    if (ts.isExpressionStatement(parent) || ts.isTypeOfExpression(parent) || ts.isVoidExpression(parent)) return true
    // A cast to a type that keeps the groups carries on; to anything else it escapes
    if (ts.isAsExpression(parent) || ts.isSatisfiesExpression(parent) || ts.isTypeAssertionExpression(parent))
      return keeps(checker.getTypeAtLocation(parent), groups) && flowsOn(parent, groups)
    if (
      (ts.isPropertyAssignment(parent) || ts.isShorthandPropertyAssignment(parent) || ts.isArrayLiteralExpression(parent)) &&
      destructuredLiteral(parent)
    )
      return true
    const contextual = checker.getContextualType(node)
    // With no declared type, a returned value becomes the function's return type, and a property
    // or element becomes part of its literal's type: the call or the literal is checked instead
    if (
      !contextual &&
      (ts.isReturnStatement(parent) ||
        (ts.isArrowFunction(parent) && parent.body === node) ||
        ts.isPropertyAssignment(parent) ||
        ts.isShorthandPropertyAssignment(parent) ||
        ts.isArrayLiteralExpression(parent) ||
        ts.isSpreadElement(parent))
    )
      return true
    return keeps(contextual, groups)
  }

  // The object or array literal a property, element or spread sits in, when that literal is
  // destructured on the spot (`const { a } = { ...semantic }`): the destructure gives it a
  // contextual type, but every name it takes is traced through its own type
  const destructuredLiteral = (node: ts.Node): boolean => {
    const literal = ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node) || ts.isSpreadAssignment(node) ? node.parent : node
    if (!ts.isObjectLiteralExpression(literal) && !ts.isArrayLiteralExpression(literal)) return false
    const declaration = literal.parent
    return ts.isVariableDeclaration(declaration) && declaration.initializer === literal && !ts.isIdentifier(declaration.name) && !declaration.type
  }

  const isValueReference = (node: ts.Identifier): boolean => {
    const parent = node.parent
    if (ts.isPropertyAccessExpression(parent)) return parent.expression === node
    if (ts.isShorthandPropertyAssignment(parent)) return true
    if (ts.isBindingElement(parent)) return false
    if ('name' in parent && (parent as { name?: ts.Node }).name === node) return false
    if (ts.isImportClause(parent) || ts.isImportSpecifier(parent) || ts.isNamespaceImport(parent) || ts.isExportSpecifier(parent)) return false
    for (let up: ts.Node = parent; !ts.isSourceFile(up); up = up.parent) {
      if (ts.isTypeNode(up)) return false
      if (ts.isStatement(up)) break
    }
    return true
  }

  const visit = (node: ts.Node) => {
    if (ts.isPropertyAccessExpression(node)) {
      const from = groupsOf(checker.getTypeAtLocation(node.expression))
      if (from.length) recordRead(node, from, [node.name.text])
    } else if (ts.isElementAccessExpression(node)) {
      const from = groupsOf(checker.getTypeAtLocation(node.expression))
      if (from.length) recordRead(node, from, keysOf(node.argumentExpression))
    } else if (ts.isObjectBindingPattern(node)) {
      const from = groupsOf(checker.getTypeAtLocation(node))
      if (from.length) {
        const named: string[] = []
        for (const element of node.elements) {
          if (element.dotDotDotToken) continue
          const key = element.propertyName
          const keys = !key
            ? [(element.name as ts.Identifier).text]
            : ts.isComputedPropertyName(key)
              ? keysOf(key.expression)
              : [(key as ts.Identifier | ts.StringLiteral | ts.NumericLiteral).text]
          named.push(...(keys ?? []))
          recordRead(element, from, keys)
        }
        // A rest element takes the tokens that weren't named; its nested groups keep their types
        const rest = node.elements.find((element) => element.dotDotDotToken)
        if (rest) {
          const paths = from.flatMap((group) =>
            directLeaves(tree, group).filter((leaf) => !named.includes(leaf.slice(group ? group.length + 1 : 0)))
          )
          recordEscape(rest, from, paths)
        }
      }
    }

    // A value that is or holds token groups, in a position that loses their types
    const isCandidate =
      (ts.isIdentifier(node) && isValueReference(node)) ||
      ts.isPropertyAccessExpression(node) ||
      ts.isElementAccessExpression(node) ||
      ts.isCallExpression(node) ||
      ts.isObjectLiteralExpression(node) ||
      ts.isArrayLiteralExpression(node)
    if (isCandidate) {
      const expression = node as ts.Expression
      const groups = groupsWithin(checker.getTypeAtLocation(expression))
      if (groups.length) {
        // A spread into an object literal copies the group's tokens as plain strings, while its
        // nested groups stay typed in the new literal (which is checked as a whole)
        if (
          ts.isSpreadAssignment(expression.parent) &&
          (destructuredLiteral(expression.parent) || !checker.getContextualType(expression.parent.parent))
        ) {
          recordEscape(expression, groups, groups.flatMap((group) => directLeaves(tree, group)))
        } else if (!flowsOn(expression, groups)) {
          recordEscape(expression, groups, groups.flatMap((group) => leavesUnder(tree, group)))
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  for (const source of program.getSourceFiles()) {
    if (!source.isDeclarationFile && !source.fileName.endsWith('.json') && include(source)) visit(source)
  }
  return reads
}

type Node = { [key: string]: unknown }

/** Deprecated token paths from the token sources, with the reason in their `$deprecated` */
export function deprecatedTokens(): Map<string, string> {
  const found = new Map<string, string>()
  const walk = (node: Node, at: string[]) => {
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith('$') || !child || typeof child !== 'object') continue
      const next = [...at, key]
      if ('$value' in (child as Node)) {
        const reason = (child as Node).$deprecated
        if (reason !== undefined) found.set(next.join('.'), String(reason))
      } else walk(child as Node, next)
    }
  }
  for (const tier of ['base', 'semantic', 'component']) {
    walk(JSON.parse(fs.readFileSync(path.join(ROOT, `src/tokens/${tier}/index.json`), 'utf8')), [])
  }
  return found
}
