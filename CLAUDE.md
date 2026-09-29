# Common Origin Design System

React component library and design tokens (`@common-origin/design-system`), plus a Next.js docs site (https://common-origin-design-system.vercel.app/).

## Foundation (always applies)

@docs/foundation/README.md
@docs/foundation/principles.md

Read these as needed:
- `docs/foundation/visual-language.md` — before any visual, token, or motion change
- `docs/foundation/decisions/` — why things are the way they are
- `docs/foundation/users.md`, `purpose.md`, `brand.md`, `usage.md`
- `docs/tokens/pipeline.md` — before changing tokens or the Style Dictionary config (don't trust `.github/TOKEN_MANAGEMENT.md` for this)

The guidance in `.github/*.md` predates the foundation and is partly inaccurate. Where it conflicts with `docs/foundation/`, the foundation wins.

## Layout

- `src/components/{atoms,molecules,layout}/Name/` — `Name.tsx`, `Name.test.tsx`, `Name.docs.tsx`, `index.ts`. This is the published package.
- `src/tokens/` — token sources. `npm run build:tokens` compiles them to `src/styles/tokens.json` (+ `.d.ts`, `.css`).
- `src/page-components/`, `src/patterns/`, `pages/` — docs site only. Package components must never import from these.
- `src/lib/componentsData.ts` — registers each `.docs.tsx` on the docs site.

## Commands

```bash
npm run typecheck        # tsc --noEmit
npm run lint             # eslint; --max-warnings ratchet — never raise the number, lower it when you fix warnings
npm run verify:docs      # docs must not reference missing files, folders or npm scripts
npm test                 # jest (includes jest-axe)
npm run build:package    # rollup → dist/
npm run verify:package   # after build:package: .d.ts imports resolvable, consumer type-check, publint, attw
npm run build            # docs site
```

Run typecheck, lint, tests, `build:package` and `verify:package` before proposing any change as done.

## Gotchas

- Published `.d.ts` files must not contain `@/` aliases or JSON imports. For token-based prop types use `import type { Tokens } from '../../../types/tokens'` and `keyof Tokens['semantic'][…]`, never `keyof typeof` an imported JSON file.
- `npm run build` rewrites `tsconfig.json` and `next-env.d.ts`, and `build:tokens` rewrites the generated token files' timestamps. Don't commit those incidental changes.

## Agents and skills

Specialist subagents live in `.claude/agents/`. Each is a thin wrapper around the matching `.github/agents/*.md` (shared with Copilot, so the instructions can't drift) that adds tool limits and Claude-specific rules. Subagents report back; this session commits, opens PRs and moves the board.

| Subagent | Use for |
|---|---|
| `design-system-reviewer` | a broad audit: find and fix the 1–3 highest-value issues |
| `component-quality-specialist` | a deep pass on one named component |
| `accessibility-specialist` | ARIA, keyboard, focus, screen readers, `jest-axe` |
| `documentation-specialist` | `.docs.tsx`, examples, anatomy, registration |
| `token-architect` | new tokens, the token pipeline, the DTCG / Style Dictionary 5 plan |

Skills in `.claude/skills/`: `new-component`, `token-change`, `component-docs`, and `release`. Release is a skill, not a subagent, because every step needs the owner's confirmation in chat.

`.claude/settings.json` pre-approves the routine checks, asks before tags, merges and force pushes, and denies `npm publish` and pushes to `main` (which branch protection also blocks).

## Pull requests

- Cite the principle (`P1`–`P9`) or decision behind any visual change, and put `Closes #N` in the body only when the PR finishes the issue. A partial PR must not contain a closing keyword in any form, including "doesn't close #N", because GitHub still auto-closes the issue.
- **Before merging:** CI is green, and every Copilot review comment is fixed or answered with a reason, with its thread resolved. Request Copilot on every PR (`gh pr edit <n> --add-reviewer @copilot`), and again after pushing fixes. Merging needs the owner's explicit yes.

## Project board — keep it current as part of the work

All work is tracked on the [Design System Roadmap project](https://github.com/users/common-origin/projects/1). Its README defines the statuses, fields (Priority, Category, Size, weekly Cycle) and the weekly rhythm. The board is only useful if it's true, so update it when things happen, not afterwards. Use `scripts/project-item.sh <issue> Field=Value …`: it adds the issue to the project if needed and looks up IDs by name. It needs a `gh` token with the `project` scope (`gh auth refresh -s project`).

- **Picking up an issue:** only take issues in **Ready**. Ready means the issue states the problem, the settled decisions and *Done when*, so it can be completed without asking questions. When you create the branch, run `scripts/project-item.sh <N> Status="In progress"`. Keep at most 3 items In progress.
- **Opening the PR:** put `Closes #<N>` in the body (the board moves the issue to Done on merge) and run `scripts/project-item.sh <N> Status="In review"`.
- **Blocked on the owner** (a design or product call, an open question in the foundation): comment the exact ask on the issue, with the options and a recommendation, then run `scripts/project-item.sh <N> Status="Needs owner"`. Don't leave it silently In progress.
- **Raising a new issue:** add it with every field set, e.g. `scripts/project-item.sh <N> Status=Backlog Priority=P2 Category=Bug Size=S`. Mark it **Ready** only if it meets the Ready bar; otherwise use **Backlog**. If it belongs to an initiative (Category *Initiative*, currently #42), add it as a sub-issue of that parent.
