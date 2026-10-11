import tokens from '../../styles/tokens.json'

/**
 * Every token path under a group, for docs pages whose component accepts any
 * token in that group as a prop (Box's `bg`, for example). Docs token lists
 * must hold exact paths, never wildcards (#114), and expanding from
 * tokens.json keeps the list in step when the group gains or loses a token.
 *
 * Throws if the group doesn't exist, so a renamed group fails the docs
 * token-path test instead of silently listing nothing.
 */
export function tokenPaths(group: string): string[] {
  const node = group.split('.').reduce<unknown>(
    (current, key) => (current !== null && typeof current === 'object' ? (current as Record<string, unknown>)[key] : undefined),
    tokens
  )
  if (node === null || typeof node !== 'object') {
    throw new Error(`tokenPaths: no token group at "${group}"`)
  }
  return Object.entries(node).flatMap(([key, value]) =>
    typeof value === 'string' ? [`${group}.${key}`] : tokenPaths(`${group}.${key}`)
  )
}
