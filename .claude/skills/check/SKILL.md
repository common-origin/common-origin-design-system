---
name: check
description: 'Run the repo''s checks (typecheck, lint, tests, docs, package build and verify) with quiet output. Use while working on a change, and always before saying a change is done or opening or updating a PR.'
---

# Check

Run checks through `npm run check`, not the separate commands. It prints one line per step and only the failures in full, so a passing run costs a few lines of context instead of thousands. Each step's full output stays in a log file, named on its `FAIL` line.

| When | Command | Runs |
|---|---|---|
| While iterating | `npm run check -- --changed` | typecheck, eslint on the changed files, the Jest tests related to the changed files, `verify:docs` |
| Before "done", a commit for review, or a push to a PR | `npm run check` | typecheck, lint (with the ratchet), all tests, `verify:docs`, `build:package`, `verify:package` |

Both rebuild the tokens first when the branch changes `src/tokens/` or the palette and Style Dictionary config, and fail if the generated files in `src/styles/` were stale. "Changed" means anything that differs from the merge base with `origin/main`, committed or not, plus untracked files.

## Rules

- **Don't run the underlying commands directly** to see whether they pass (`npm test`, `npx jest`, `npm run lint`, and so on). Use them only to dig into a failure the check reported, and narrow them: `npx jest path/to/File.test.tsx -t 'name'`, or read the named log.
- **`--changed` is never the final check.** It misses tests that don't import the changed files, the package build, and the lint ratchet. Run the full check before you say a change is done and before every push for review.
- **Report the real result.** Quote the summary lines in PR bodies and review comments: say which steps passed, and the test count if it matters. Never say checks pass if you ran only `--changed`.
- **Lint ratchet:** when the check prints a `note` that lint has fewer warnings than `--max-warnings`, lower the number in `package.json` to that count in the same change. Never raise it.
- **A stale-tokens failure has already rebuilt the files.** Review the diff in `src/styles/` and commit it with the token source change (see the `token-change` skill).
- **Browser checks are separate.** `npm run check` doesn't run Playwright. When the change affects layout, motion, focus, forced colours, density or theme, also run the relevant spec: `npx playwright test e2e/name.spec.ts`. CI runs them all on every PR.
