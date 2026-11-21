---
name: component-change
description: 'Fix or change an existing component in the package (behaviour, styling, props, motion or structure) and carry the change through to its tests, docs, e2e fixtures, tokens and foundation docs. Use for any edit under src/components/ that isn''t a brand-new component.'
---

# Changing a component

Most of the cost of a component change is in what it touches besides the component. Use this skill to find all of that before review does. For a new component use `new-component`. For a full quality pass on one component use the `component-quality-specialist` subagent.

## 1. Before editing

- **Know the decision.** The issue gives the problem and the settled decisions. Find the principle (`P1`–`P9`) or decision record behind the change, because the PR has to cite it. If nothing covers a visual choice, or the rule is an **Open question** in `docs/foundation/visual-language.md`, stop and ask the owner instead of guessing (`ship-issue` has the Needs-owner steps).
- **Read the component, its tests, its `.docs.tsx` and its siblings.** Look for the same decision made elsewhere: family members (SidebarNavItem and SidebarNavSection, the chip types, the field components), shared files such as `sidebarNavMotion.ts` and shared component tokens. P5 means the same decision is made the same way everywhere, so either change them together or raise an issue for the rest.
- **Find who reads what you'll change:** `grep -rn "ComponentName\|data-testid=\"…\"" src pages e2e` finds the docs examples, the fixtures in `pages/fixtures/`, the e2e specs and the other components that use it.

## 2. Values

- Tokens only (P3). Semantic first. Component tokens only for a departure, a family or a state matrix (0014). **Never a component spacing token** (0022).
- Snap off-grid pixel values to the nearest spacing token. If the snapped result looks unbalanced, keep the snap and raise an issue to rebalance the component.
- **Every new token needs the owner's yes in chat before you create it**, with its tier, value, purpose and why no existing token does the job. Then follow the `token-change` skill.
- Motion uses `semantic.motion` tokens (300ms maximum), and every motion respects reduced motion (P6, 0015).

## 3. What else the change touches

| If the change… | Also update |
|---|---|
| adds, removes or renames a prop, value or export | JSDoc, and the props table in `.docs.tsx`. Adding is a minor release. Removing or renaming is a major (P7), so deprecate it instead unless the issue says otherwise |
| changes which tokens a style reads | the `tokens` array and the anatomy parts in `.docs.tsx` (exact paths from `src/styles/tokens.json`) |
| changes a token's value | the golden diff (`token-change`). Every consumer sees it, so name it in the PR |
| changes size, layout, overflow, focus, motion or theme behaviour | a unit test for what jsdom can see, plus a Playwright spec and fixture (`e2e/`, `pages/fixtures/`) for what it can't. Make the spec fail on `main` first |
| changes the DOM structure | selectors in tests, fixtures and e2e specs. Say in the PR that the DOM changed and whether anything public reads it |
| changes or adds a rule | a new decision record (`docs/foundation/decisions/`, next number, added to its `README.md` index), plus any status in `visual-language.md` and token meaning in `docs/tokens/semantic.md` it changes. Amend older records only through a new one |
| changes the docs-site group or tier | `category` and `tier` in `.docs.tsx` (0057) |
| affects an organism's region | that organism's `.docs.tsx` examples and anatomy too |

## 4. Prove it

- **Show the bug first.** Write the test that fails on the current code, then fix it.
- **Keep accessibility passing (P2).** Tests use role-based queries, keyboard paths are tested, and `jest-axe` reports no violations.
- **Look at it.** Start the docs site (`.claude/launch.json` → `docs`; reuse the owner's server on :3000 if it's running), open the component on `/components`, and check light and dark, the densities, hover, focus and active states, and reduced motion if it moves. To run e2e while the owner's dev server holds :3000, use a temporary Playwright config with `baseURL` `http://localhost:3000` and no `webServer`, and delete it afterwards.
- **Run `npm run check`** (the `check` skill) and quote its result in the PR.

## 5. In the PR

Give the problem, the approach, the principle or decision for each visual change, what's unchanged that a reviewer might worry about (API, reduced motion, keyboard), the DOM or token changes, and the checks you ran. `ship-issue` has the rest.
