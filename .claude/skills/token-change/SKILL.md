---
name: token-change
description: 'Add or change a design token (base, semantic or component tier) and rebuild the token outputs safely. Use whenever a change touches src/tokens/ or needs a new token instead of a hard-coded value.'
---

# Token change

Read `docs/tokens/pipeline.md` first: it is the source of truth for the build (not `.github/TOKEN_MANAGEMENT.md`). The rules for new tokens are in `.github/agents/token-architect.md` ("Rules for every token you add"), and decision 0014 sets which tier a component uses. For bigger or pipeline work, use the `token-architect` subagent.

## Steps

1. **Check first.** Search `src/styles/tokens.json` for an existing token with the same role and value. Components use semantic tokens by default. Component tokens are for departures, families and state matrices, and reference semantic tokens, never base.
2. **Snapshot** the compiled output:
   ```bash
   cp src/styles/tokens.json /tmp/tokens.before.json
   ```
3. **Edit the source** in `src/tokens/{base,semantic,component}/index.json`. Every new token is a real leaf (`value`, `type`) with a `description` saying when to use it. Don't use raw `px` in semantic or component tokens; reference a dimension token. Snap off-grid values to the spacing scale.
4. **Build and diff:**
   ```bash
   npm run build:tokens
   node -e "const a=require('/tmp/tokens.before.json'),b=require('./src/styles/tokens.json');const d=(x,y,p='')=>{for(const k of new Set([...Object.keys(x||{}),...Object.keys(y||{})])){const P=p?p+'.'+k:k;if(typeof x?.[k]==='object'||typeof y?.[k]==='object')d(x?.[k],y?.[k],P);else if(x?.[k]!==y?.[k])console.log(P,x?.[k],'→',y?.[k])}};d(a,b)"
   ```
   The diff must show exactly the intended changes and nothing else. A changed value of an existing token is a visual change for every consumer, so it's only intended if the owner has decided it (P7); an unexpected one is a regression to fix.
5. **Drop timestamp noise.** `build:tokens` rewrites the "Generated on" header in `src/styles/tokens.css` and `src/styles/tokens.d.ts` (`docs/tokens/pipeline.md` §1). If those are the only changes to a file, revert it; otherwise restore the header line from `HEAD` so the diff holds only real changes.
6. **Use it:** reference the token from the component, and list it in that component's `.docs.tsx` `tokens` array as an exact path.
7. **Validate:** typecheck, lint, test, `build:package`, `verify:package`, as in `CLAUDE.md`. `src/tokens/*.test.ts` guard the z-index layers, font weights and motion tokens.

In the PR, cite P3 or the decision behind the token, and paste the resolved-value diff.
