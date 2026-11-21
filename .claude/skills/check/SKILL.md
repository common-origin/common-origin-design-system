---
name: check
description: 'Run the repo''s checks (typecheck, lint, tests, docs, package build and verify) with quiet output. Use while working on a change, and always before saying a change is done or opening or updating a PR.'
---

# Check

Run checks through `npm run check`, not the separate commands. It prints one line per step and only the failures in full, so a passing run costs a few lines of context instead of thousands. Each step's full output stays in a log file, named on its `FAIL` line.

| When | Command | Runs |
|---|---|---|
| While iterating | `npm run check -- --changed` | typecheck, eslint on the changed files, the Jest tests related to the changed files, `verify:docs` |
| Before "done", a commit for review, or a push to a PR | `npm run check` | tokens, then typecheck, lint (with the ratchet), all tests and `verify:docs` side by side, then `build:package` and `verify:package` (about 2 minutes) |

The full run always rebuilds the tokens first, as CI does, and fails if the generated files in `src/styles/` didn't match the sources. `--changed` does that only when the branch touches the token sources, `config/`, the palette scripts or the generated files. If `origin/main` is missing, `--changed` says so and counts only uncommitted changes: run `git fetch origin main`. "Changed" means anything that differs from the merge base with `origin/main`, committed or not, plus untracked files.

## Rules

- **Don't run the underlying commands directly** to see whether they pass (`npm test`, `npx jest`, `npm run lint`, and so on). Use them only to dig into a failure the check reported, and narrow them: `npx jest path/to/File.test.tsx -t 'name'`, or read the named log.
- **`--changed` is never the final check.** It misses tests that don't import the changed files, the package build, and the lint ratchet. Run the full check before you say a change is done and before every push for review.
- **Report the real result.** Quote the summary lines in PR bodies and review comments: say which steps passed, and the test count if it matters. Never say checks pass if you ran only `--changed`.
- **Lint warnings:** a lint failure shows errors anywhere, but only the warnings in files the branch changed, since the rest predate it. `--changed` doesn't fail on warnings: it prints a `note` with the count in the changed files, and new ones will fail the full run's ratchet, so fix them as you go.
- **Lint ratchet:** when the check prints a `note` that lint has fewer warnings than `--max-warnings`, lower the number in `package.json` to that count in the same change. Never raise it.
- **A stale-tokens failure has already rebuilt the files.** Review the diff in `src/styles/` and commit it with the token source change (see the `token-change` skill).
- **The docs site build is separate.** CI also runs `npm run build`. Run it too when the change touches `pages/`, `src/page-components/`, `src/patterns/`, a `.docs.tsx` example or the Next config.
- **Browser checks are separate.** `npm run check` doesn't run Playwright. When the change affects layout, motion, focus, forced colours, density or theme, also run the relevant spec: `npx playwright test e2e/name.spec.ts`. CI runs them all on every PR.
