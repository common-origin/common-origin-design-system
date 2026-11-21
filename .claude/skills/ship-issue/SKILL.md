---
name: ship-issue
description: 'Take a roadmap issue from Ready to a reviewed PR: board moves, branch, commits, PR body, the /code-review loop and the merge ask. Use when picking up an issue, raising one for a fix found in passing, opening or updating a PR, or when work is blocked on an owner decision.'
---

# Shipping an issue

This skill gathers the rules from `CLAUDE.md` ("Pull requests" and "Project board") into the order you meet them. The board is only useful if it's true, so move it when things happen. `scripts/project-item.sh` needs a `gh` token with the `project` scope.

## 1. Pick it up

```bash
gh issue view <N> --json title,body,projectItems -q '.title, (.projectItems[].status.name), .body'
```

- **Only take issues in Ready.** Ready means the issue states the problem, the settled decisions and *Done when*. If one is missing, don't guess: ask the owner (step 5).
- At most 3 items In progress: `gh issue list --search 'is:open' --json number,projectItems -q '.[] | select(any(.projectItems[]; .status.name == "In progress")) | .number'`.
- **No PR without an issue**, except a release version bump. For a fix found in passing, raise the issue first, with every field set, and go straight to In progress:
  ```bash
  gh issue create --title "…" --body "Problem, decision, Done when"
  scripts/project-item.sh <N> Status="In progress" Priority=P2 Category=Bug Size=S
  ```
  If it belongs to an initiative (Category *Initiative*, currently #187), add it as a sub-issue of that parent.

## 2. Branch

- Branch from fresh `main`: `type/short-slug-N`, for example `fix/list-item-tall-content-390` or `feat/more-icons-385` (type is `feat`, `fix`, `docs`, `test`, `refactor` or `chore`).
- If the current checkout has someone's uncommitted work, don't stash or switch it: work in a worktree (`git worktree add -b <branch> <path> origin/main`).
- Then `scripts/project-item.sh <N> Status="In progress"`, which also sets the current Cycle.

## 3. Commit

- Conventional subject in plain words saying what is now true: `fix: ListItem expanded content shows in full at any height`. **Never `#N` in a subject**: auto-changelog reads it as a PR number and duplicates the entry. Cite issues in the body.
- The body says why, and what a reviewer might worry about. End with the attribution trailer from the session's instructions.
- `Closes #N` only in a commit or PR that finishes the issue. A partial step **never contains a closing keyword in any form**, not even "doesn't close #N" or "fixes part of #N": GitHub auto-closes on the keyword. Write "Part of #N".
- Before committing for review: `npm run check` (the `check` skill), plus the browser checks the change needs.

## 4. Open the PR and review it

```bash
git push -u origin <branch>
gh pr create --title "<same plain-words subject>" --body-file <file>
scripts/project-item.sh <N> Status="In review"
```

The body follows the shape of recent PRs (for example common-origin/common-origin-design-system#393):

```markdown
## What
The problem, then the approach. Cite the principle (P1–P9) or decision behind every visual change.

Unchanged: what a reviewer might worry about (API, reduced motion, keyboard), if it's not obvious.

## Checks
- Tests added, and what they prove (a spec that fails on main, if there is one).
- What you looked at in the docs site.
- `npm run check`: all passed (N tests).

Closes #N            ← only if this PR finishes the issue; otherwise "Part of #N"

<attribution line from the session's instructions>
```

Then the review loop, until a pass has no unaddressed findings:

1. Run `/code-review <PR number>`.
2. For each finding: fix it, or decide not to and give the reason. Put all the fixes in one commit, `fix: address review of <the change>`, run `npm run check`, and push.
3. Post the result on the PR as a comment, one per pass:
   ```markdown
   ## `/code-review` (<level>) — <n> findings

   | # | Finding | Outcome |
   |---|---|---|
   | 1 | <the finding, briefly> | **Fixed** in <sha>: <how> / **Not changed**: <reason; issue #M if it's follow-up work> |

   Rechecked: `npm run check` all passed (N tests).
   ```
   Head a later pass `## /code-review (<level>), second pass — …`.
4. If you pushed fixes, run `/code-review` again.

Raise follow-up work that a finding turns up as its own issue (step 1) and link it from the table.

## 5. Blocked on the owner

For a design or product call, or an open question in the foundation, comment the exact ask on the issue (the options, and your recommendation), then:

```bash
scripts/project-item.sh <N> Status="Needs owner"
```

Ask the owner in chat as plain text: numbered questions, lettered options with one marked "(recommended)", one issue at a time. When it's decided, record a decision record if the answer is a rule, update the issue, and move the issue back to Ready or In progress.

## 6. Merge

Merge needs **all three**: CI green (`gh pr checks <n>`), the latest `/code-review` pass with every finding fixed or answered, and the **owner's explicit yes in chat** for this PR. Then `gh pr merge <n> --merge --delete-branch`. The board moves a closed issue to Done by itself. Remove any worktree you made (`git worktree remove <path>`).
