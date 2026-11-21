#!/usr/bin/env bash
# Run the repo's checks with quiet output: one line per step, and only the failures in full.
#
# Usage:
#   npm run check                 # everything CLAUDE.md asks for before a change is done
#   npm run check -- --changed    # fast inner loop: only what the branch's changes can affect
#
# Full run: tokens (when token sources changed), typecheck, lint, test, verify:docs,
# build:package, verify:package.
# --changed: tokens (when token sources changed), typecheck, eslint on the changed files,
# the Jest tests related to the changed files (jest --findRelatedTests), verify:docs.
#
# "Changed" means files that differ from the merge base with origin/main, staged or not,
# plus untracked files.
#
# Each step's full output is kept in a log file, named in the summary, so a failure can be
# read in full without rerunning. Exits non-zero if any step fails.
set -uo pipefail

cd "$(dirname "$0")/.."

mode=full
case "${1:-}" in
  "") ;;
  --changed) mode=changed ;;
  -h|--help) awk 'NR > 1 && /^#/ { sub(/^# ?/, ""); print; next } NR > 1 { exit }' "$0"; exit 0 ;;
  *) echo "check: unknown option '$1' (use --changed or no option)" >&2; exit 2 ;;
esac

TMPDIR="${TMPDIR:-/tmp}"
logs="$(mktemp -d "${TMPDIR%/}/ds-check.XXXXXX")"
failed=0
failed_steps=""

# Files changed on this branch: committed since the merge base, uncommitted, and untracked
base="$(git merge-base HEAD origin/main 2>/dev/null || echo HEAD)"
changed_files="$( { git diff --name-only "$base"; git ls-files --others --exclude-standard; } | sort -u | while read -r f; do [ -f "$f" ] && echo "$f"; done )"
changed_count="$(printf '%s' "$changed_files" | grep -c . || true)"

# step <name> <excerpt-filter> <command...>
# Runs the command with its output in a log; prints a pass/fail line and, on failure, an excerpt.
step() {
  local name="$1" filter="$2"; shift 2
  local log="$logs/$name.log" start=$SECONDS
  "$@" >"$log" 2>&1
  local status=$?
  local secs=$((SECONDS - start))
  if [ $status -eq 0 ]; then
    printf '  ok    %-16s %4ss\n' "$name" "$secs"
  else
    printf '  FAIL  %-16s %4ss   (full log: %s)\n' "$name" "$secs" "$log"
    excerpt "$filter" "$log" | sed 's/^/        /'
    failed=1
    failed_steps="$failed_steps $name"
  fi
  return $status
}

skip() { printf '  skip  %-16s        %s\n' "$1" "$2"; }

# Print the useful part of a failing step's log
excerpt() {
  local filter="$1" log="$2"
  case "$filter" in
    tsc)    grep -E 'error TS' "$log" | head -30 ;;
    eslint) grep -E '^/|^[[:space:]]+[0-9]+:[0-9]+[[:space:]]+error|problems? \(|max-warnings|Too many warnings' "$log" | head -40 ;;
    jest)   { grep -A 16 -E '^[[:space:]]+● ' "$log" | grep -v '^[[:space:]]*$' | head -60; grep -E '^(Tests|Test Suites):' "$log"; } ;;
    *)      tail -30 "$log" ;;
  esac
}

# Token outputs must match their sources. Rebuild, and fail if the build changed the generated
# files (the build is deterministic, so an unchanged source leaves them untouched).
tokens_up_to_date() {
  local before after
  before="$(cat src/styles/tokens.* 2>/dev/null | shasum)"
  npm run build:tokens || return 1
  after="$(cat src/styles/tokens.* 2>/dev/null | shasum)"
  if [ "$before" != "$after" ]; then
    echo "build:tokens changed src/styles/: the generated token files were stale. They are now rebuilt; review and commit them."
    git status --short src/styles
    return 1
  fi
}

# Lint, then compare the warning count with the --max-warnings ratchet in package.json
lint_with_ratchet() {
  npm run lint
  local status=$?
  local max warnings
  max="$(node -p "(require('./package.json').scripts.lint.match(/--max-warnings (\d+)/) || [])[1] || ''")"
  warnings="$(grep -Eo '[0-9]+ warnings?\)' "$logs/lint.log" | grep -Eo '[0-9]+' | tail -1)"
  warnings="${warnings:-0}"
  if [ $status -eq 0 ] && [ -n "$max" ] && [ "$warnings" -lt "$max" ]; then
    lint_note="lint has $warnings warnings, under the ratchet of $max: lower --max-warnings in package.json to $warnings"
  fi
  return $status
}

lint_note=""
tokens_changed="$(printf '%s\n' "$changed_files" | grep -E '^(src/tokens/|config/style-dictionary|scripts/palette|scripts/generate-palette)' || true)"

if [ "$mode" = full ]; then
  echo "check: full run ($changed_count files changed vs origin/main)"
else
  echo "check: --changed ($changed_count files changed vs origin/main)"
fi

if [ -n "$tokens_changed" ]; then
  step tokens tail tokens_up_to_date
else
  skip tokens "no token sources changed"
fi

step typecheck tsc npm run typecheck

if [ "$mode" = full ]; then
  step lint eslint lint_with_ratchet
  step test jest npx jest --ci --silent
  step verify:docs tail npm run verify:docs
  if step build:package tail npm run build:package; then
    step verify:package tail npm run verify:package
  else
    skip verify:package "needs build:package"
  fi
else
  lintable="$(printf '%s\n' "$changed_files" | grep -E '\.(tsx?|jsx?|mjs|cjs)$' || true)"
  if [ -n "$lintable" ]; then
    # shellcheck disable=SC2086
    step lint eslint npx eslint $lintable
  else
    skip lint "no changed source files"
  fi
  testable="$(printf '%s\n' "$changed_files" | grep -E '\.(tsx?|jsx?|json)$' | grep -vE '^(e2e/|\.claude/|package(-lock)?\.json)' || true)"
  if [ -n "$testable" ]; then
    # shellcheck disable=SC2086
    step test jest npx jest --ci --silent --passWithNoTests --findRelatedTests $testable
  else
    skip test "no changed files with related tests"
  fi
  step verify:docs tail npm run verify:docs
fi

[ -n "$lint_note" ] && echo "  note  $lint_note"

if [ $failed -eq 0 ]; then
  if [ "$mode" = full ]; then
    echo "check: all passed"
  else
    echo "check: all passed (--changed; run the full check before calling the change done)"
  fi
  rm -rf "$logs"
else
  echo "check: failed:$failed_steps"
fi
exit $failed
