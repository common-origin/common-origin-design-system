# 0047. A proposal carries an id; a replacement is announced as an update

- **Status:** Accepted
- **Date:** 2026-10-22
- **Decided by:** Ollie (owner)
- **Principles:** P2, P7
- **Amends:** [0046](0046-agent-proposals-and-suggestions.md) (points 6 and 8)
- **Issue:** [#284](https://github.com/common-origin/common-origin-design-system/issues/284)

## Context

0046 announces a proposal from its text, for example "3 changes suggested. Accept or discard." A live region speaks only when its text changes. So when a follow-up refines an open proposal (0046 point 9) and the replacement has the same summary, a screen reader user isn't told anything changed. AgentInput can't tell a new proposal from a re-render of the same one, because products pass `review` as a new object on every render. `/code-review` found this on #283.

`review` hadn't been released yet: 2.20.0 predates it. So its shape could still change without breaking anyone (P7).

## Decision

1. **A proposal carries a required `id`:** `{ state: 'proposal'; id: string; summary; onAccept; onDiscard }`. A new id is a new proposal. A request or response id, or a counter, does the job. This amends 0046 point 8's prop shape.
2. **A replacement is announced as an update.** When a proposal with a new id replaces an open one, the announcement is "Proposal updated. {summary}. Accept or discard.", including when the summary is the same and for consecutive replacements. A first proposal, or one arriving after the last was accepted, discarded or removed, is announced as before. This extends 0046 point 6's fixed wording.
3. **Summaries say what changed** (guidance), for example "3 changes: Tuesday is now fish", so sighted users can also tell proposals apart.

## Consequences

- `review` ships in its first release with `id` required; no migration is needed.
- AgentInput tracks the open proposal's id, and alternates an unspoken trailing no-break space between consecutive replacements so the live region's text always changes.
