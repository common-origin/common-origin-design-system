# 0033. Token descriptions say when to use a token; facts live in fields

- **Status:** Accepted
- **Date:** 2026-10-11
- **Decided by:** Ollie (owner)
- **Principles:** P2, P3, P7
- **Amends:** [0014](0014-token-tiers.md) rule 6 ("every token has a description"): base tokens are described per group
- **Issue:** [#146](https://github.com/common-origin/common-origin-design-system/issues/146), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

Every semantic (265) and component (229) token has a `$description`, and 3 of 277 base tokens do. The descriptions reach almost no one: the source JSON and the comments in `tokens.css`. The published `Tokens` type is `typeof tokens.json`, which carries no comments, and the generated `tokens.d.ts` isn't read by anything ([pipeline §1](../../tokens/pipeline.md)).

Their style varies. Some say what the token is for; some restate the value or the name; some record process ("Approved under decision 0022"). Contrast ratios are typed into prose, and #143 took seven review rounds to remove claims that had drifted from the code. Deprecation is a "Deprecated: …" prefix that no tool can read.

The #146 research (Primer, Atlassian, Spectrum, Carbon, Polaris, GOV.UK, Figma) found that:

- every system writes one short usage line per token, and none writes separate prose for agents
- Primer ships a generated `DESIGN_TOKENS_SPEC.md` and a hand-written guide of pairing rules in its npm package, and Atlassian publishes `llms.txt` and `llms-tokens.txt`, so agents read one file rather than call a server <!-- verify-docs-ignore: another system's file, or a planned generated file -->
- Atlassian keeps each token's state and replacement as data
- DTCG 2025.10 has `$description`, `$deprecated` (a string explains it; groups pass it to their tokens) and `$extensions` (a vendor key; tools must preserve what they don't understand)

A local test showed that JSDoc on a nested token object survives `tsc --declaration`, and that `@deprecated` makes a consumer's editor report "'subdued' is deprecated".

## Decision

1. **A description says when to use the token.** One sentence of 40–120 characters, naming its job with one to three concrete examples ("Secondary text: helper text, metadata, timestamps"). No values (they change; the job shouldn't), and no process notes. Cite a decision only when it is a usage rule ("never for selection, see 0016").
2. **Facts live in fields, not prose.**
   - Deprecation uses DTCG `$deprecated`, with a string saying why.
   - `$extensions["studio.commonorigin"]` holds `replacedBy` (the path to use instead), `pairsWith` (paths this token is designed to sit on or under, such as a text colour and its fill) and `decision` (a decision number, only when it is a usage rule).
   - Contrast ratios are computed at build time from `pairsWith`, never typed.
3. **Base tokens are described per group** ("4px grid; the key is the multiple of 4px"), not per token. They are named by position on a scale and components never use them ([0014](0014-token-tiers.md) rule 1), so a per-token description would restate the value. Semantic and component tokens still need one each.
4. **Descriptions surface where people and agents already look**, in this order:
   1. **Types:** a generated `tokens.ts` with JSDoc and `@deprecated`, from which the published types come. Values stay typed as `string`, so consumers see no type change ([#199](https://github.com/common-origin/common-origin-design-system/issues/199)).
   2. **An agent file:** a generated `TOKENS.md` in the npm package with every semantic token's value, description, pairings, contrast and deprecation, the [0031](0031-semantic-token-grammar.md) grammar, and the rule to use only listed tokens ([#202](https://github.com/common-origin/common-origin-design-system/issues/202)). <!-- verify-docs-ignore: another system's file, or a planned generated file -->
   3. **The docs tokens page** ([#203](https://github.com/common-origin/common-origin-design-system/issues/203)).

   No MCP server or Figma output for now: a generated file covers agents without a service to run, and Figma is future work ([purpose](../purpose.md)).
5. **No separate rewrite of existing descriptions.** [#189](https://github.com/common-origin/common-origin-design-system/issues/189) adds every semantic token under a new name; those get descriptions in this style. Old names get `$deprecated` and `replacedBy` and keep their text until 3.0.

## Consequences

- Tests enforce the rules ([#200](https://github.com/common-origin/common-origin-design-system/issues/200), [#201](https://github.com/common-origin/common-origin-design-system/issues/201)):
  - every semantic and component token, and every base group, has a description
  - descriptions contain no hex or px values and no "Approved under"
  - every `replacedBy` and `pairsWith` path exists, and `replacedBy` isn't itself deprecated
  - no component uses a deprecated token
- The 59 tokens marked "Deprecated: …" in prose move to `$deprecated` (#200).
- `tokens.d.ts` is retired once the generated `tokens.ts` lands (#199), which closes the JSDoc item left open in [#24](https://github.com/common-origin/common-origin-design-system/issues/24) step 6.
- Agent-facing metadata for components stays with [#22](https://github.com/common-origin/common-origin-design-system/issues/22); this decision covers tokens only.
