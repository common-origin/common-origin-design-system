---
name: release
description: 'Cut a release of @common-origin/design-system — version-bump PR, merge, tag, and npm publish through Trusted Publishing. Use when asked to release, publish, bump the version or tag.'
---

# Release

The flow is in `.github/agents/release.agent.md` (shared with Copilot) and the background in `RELEASE.md`. Read both, then follow them in this session. Release stays a skill rather than a subagent because every step needs Ollie's confirmation in chat.

## Claude-specific rules

- **Preview, confirm, then act.** Get the release type (patch, minor, major or `X.Y.Z`) from Ollie. `scripts/release.sh` prompts `[y/N]`, which can't be answered interactively here, so preview first by answering no. Declining exits before anything is created or pushed:
  ```bash
  echo n | npm run release:create <type>
  ```
  Show Ollie the previewed version and commit list. Only after Ollie confirms that exact version in chat, run it for real, passing the explicit version so it can't differ from the preview:
  ```bash
  echo y | npm run release:create X.Y.Z
  ```
- **The version-bump PR is a normal PR:** request Copilot, wait for the review, fix or answer every comment, resolve the threads, and merge only with Ollie's explicit yes.
- **Tagging publishes, and publishing can't be undone.** Pull once, before the preview, never after Ollie confirms:
  ```bash
  git switch main && git pull
  echo n | npm run release:tag     # checks main and the CHANGELOG entry, shows the version, tags nothing
  git rev-parse --short HEAD
  ```
  Ask Ollie to confirm that exact version **and** SHA. Then, without pulling again, check neither has changed and tag:
  ```bash
  git rev-parse --short HEAD                              # must equal the confirmed SHA
  node -p "require('./package.json').version"             # must equal the confirmed version
  echo y | npm run release:tag
  ```
  If either differs, stop and ask again. `release.sh` also refuses to run if `origin/main` has moved since the pull.
- **Never** run `npm publish` or `npm run release` (both are denied in `.claude/settings.json`), push to `main`, or move a tag without Ollie's explicit approval and the recovery steps in `RELEASE.md`.
- After publishing: link the `📦 Publish Package` run, check `npm view @common-origin/design-system version`, and update the checklist in #42 if the release closes items there.
