---
name: token-change
description: 'Add or change a design token (base, semantic or component tier) and rebuild the token outputs safely. Use whenever a change touches src/tokens/ or needs a new token instead of a hard-coded value.'
---

# Token change

Read `docs/tokens/pipeline.md` first: it is the source of truth for the build (not `.github/TOKEN_MANAGEMENT.md`). The rules for new tokens are in `.github/agents/token-architect.md` ("Rules for every token you add"), and decision 0014 sets which tier a component uses. For bigger or pipeline work, use the `token-architect` subagent.

## Steps

1. **Check first.** Search `src/styles/tokens.json` for an existing token with the same role and value. Components use semantic tokens by default. Component tokens are for departures, families and state matrices, and reference semantic tokens, never base. **Never a component spacing token** (padding, margin, gap): spacing comes from the semantic scales (decision 0022).
   **Get sign-off before creating any token** (decision 0022): ask the owner in chat with the token's tier, value, what it's for, and why no existing token does the job, and wait for a yes. A subagent stops and reports the proposal instead.
2. **Edit the source** in `src/tokens/{base,semantic,component}/index.json`. The source is DTCG: every new token is a leaf with `$value` and a `$description` saying when to use it, and a DTCG `$type` (on the token, or inherited from its group). Use the DTCG type names already in the file (`color`, `dimension`, `number`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `strokeStyle`, `shadow`, `border`, `transition`, `typography`). Don't use raw `px` in semantic or component tokens; reference a dimension token. Snap off-grid values to the spacing scale.
3. **Build and diff against the golden file** (`config/tokens.golden.json`, decision 0017):
   ```bash
   npm run build:tokens
   npx jest src/tokens/golden
   ```
   The test fails and lists every path that differs: `a → b` for a changed value, "not in golden" for a new token, "missing" for a removed one. It must show exactly the intended changes and nothing else. A changed value of an existing token is a visual change for every consumer, so it's only intended if the owner has decided it (P7); an unexpected one is a regression to fix.
4. **Accept the intended changes:** `npm run tokens:golden`, then rerun the test. Commit `config/tokens.golden.json` with the source change, so the diff shows reviewers every resolved value that moved.
5. **Commit the regenerated files.** The build is deterministic (no timestamps), so `src/styles/` changes only where tokens changed.
6. **Use it:** reference the token from the component, and list it in that component's `.docs.tsx` `tokens` array as an exact path.
7. **Validate:** typecheck, lint, test, `build:package`, `verify:package`, as in `CLAUDE.md`. `src/tokens/*.test.ts` guard the golden resolved values, the z-index layers, font weights and motion tokens.

In the PR, cite P3 or the decision behind the token, and paste the resolved-value diff.
