#!/usr/bin/env bash
# Run the repo's checks with quiet output: one line per step, and only the failures in full.
#
# Usage:
#   npm run check                 # everything CLAUDE.md asks for before a change is done
#   npm run check -- --changed    # fast inner loop: only what the branch's changes can affect
#
# Full run: tokens, then typecheck, lint, test and verify:docs side by side, then
# build:package and verify:package.
# --changed: tokens (when token sources or generated files changed), typecheck, eslint on the
# changed files, the Jest tests related to the changed files (jest --findRelatedTests), verify:docs.
# Neither builds the docs site (npm run build), which CI also runs.
#
# "Changed" means files that differ from the merge base with origin/main, staged or not,
# plus untracked files.
#
# Each step's full output is kept in a log file, named in the summary, so a failure can be
# read in full without rerunning. Exits non-zero if any step fails.
set -uo pipefail

cd "$(dirname "$0")/.."
root="$(pwd -P)"

mode=full
case "${1:-}" in
  "") ;;
  --changed) mode=changed ;;
  -h|--help) awk 'NR > 1 && /^#/ { sub(/^# ?/, ""); print; next } NR > 1 { exit }' "$0"; exit 0 ;;
  *) echo "check: unknown option '$1' (use --changed or no option)" >&2; exit 2 ;;
esac

TMPDIR="${TMPDIR:-/tmp}"
logs="$(mktemp -d "${TMPDIR%/}/ds-check.XXXXXX")"
failed_steps=""

# Files changed on this branch: committed since the merge base, uncommitted, and untracked
if base="$(git merge-base HEAD origin/main 2>/dev/null)"; then
  base_note=""
else
  base=HEAD
  base_note="origin/main not found, so only uncommitted changes count as changed (run: git fetch origin main)"
fi
changed_files="$( { git diff --name-only "$base"; git ls-files --others --exclude-standard; } | sort -u | while read -r f; do [ -f "$f" ] && echo "$f"; done )"
changed_count="$(printf '%s' "$changed_files" | grep -c . || true)"
printf '%s\n' "$changed_files" | sed "s|^|$root/|" > "$logs/changed.txt"

# run_step <name> <excerpt-filter> <command...>
# Runs the command with its output in <name>.log, and writes its summary (a pass/fail line and,
# on failure, an excerpt) to <name>.sum and its exit status to <name>.rc. Prints nothing, so
# steps can run side by side; report prints the results in order.
run_step() {
  local name="$1" filter="$2"; shift 2
  local log="$logs/$name.log" start=$SECONDS
  "$@" >"$log" 2>&1
  local status=$?
  local secs=$((SECONDS - start))
  {
    if [ $status -eq 0 ]; then
      printf '  ok    %-16s %4ss\n' "$name" "$secs"
    else
      printf '  FAIL  %-16s %4ss   (full log: %s)\n' "$name" "$secs" "$log"
      excerpt "$filter" "$log" | sed 's/^/        /'
    fi
  } >"$logs/$name.sum"
  echo $status >"$logs/$name.rc"
  return $status
}

# report <name>...: print each step's summary and record failures
report() {
  local name
  for name in "$@"; do
    if [ -f "$logs/$name.rc" ]; then
      cat "$logs/$name.sum"
    else
      printf '  FAIL  %-16s        stopped before it finished (full log: %s)\n' "$name" "$logs/$name.log"
    fi
    [ "$(cat "$logs/$name.rc" 2>/dev/null)" = 0 ] || failed_steps="$failed_steps $name"
  done
}

# step: run one step and report it straight away. Returns the step's status.
step() { run_step "$@"; local status=$?; report "$1"; return $status; }

skip() { printf '  skip  %-16s        %s\n' "$1" "$2"; }

# Print the useful part of a failing step's log
excerpt() {
  local filter="$1" log="$2"
  case "$filter" in
    tsc)    grep -E 'error TS' "$log" | head -30 ;;
    # Errors anywhere, warnings only in changed files (the rest predate the branch), and the totals
    eslint) awk -v list="$logs/changed.txt" '
              BEGIN { while ((getline line < list) > 0) changed[line] = 1 }
              /^\// { file = $0; shown = 0; next }
              /^[[:space:]]+[0-9]+:[0-9]+[[:space:]]/ {
                if ($0 ~ /^[[:space:]]+[0-9]+:[0-9]+[[:space:]]+error[[:space:]]/ || (file in changed)) {
                  if (!shown) { print file; shown = 1 }
                  print
                }
                next
              }
              tolower($0) ~ /problems? \(|too many warnings/ { print }
            ' "$log" | head -40 ;;
    # Jest repeats every failure under "Summary of all failing tests"; show each once
    jest)   { sed '/Summary of all failing tests/,$d' "$log" | grep -A 16 -E '^[[:space:]]+● ' | grep -v '^[[:space:]]*$' | head -60
              grep -E '^(Tests|Test Suites):' "$log"; } ;;
    *)      tail -30 "$log" ;;
  esac
}

# Token outputs must match their sources, as CI checks. Rebuild, and fail if the build changed
# the generated files (the build is deterministic, so up-to-date files are left untouched).
tokens_up_to_date() {
  local before after
  before="$(cat src/styles/tokens.* 2>/dev/null | shasum)"
  npm run build:tokens || return 1
  after="$(cat src/styles/tokens.* 2>/dev/null | shasum)"
  if [ "$before" != "$after" ]; then
    echo "build:tokens changed src/styles/: the generated token files didn't match the sources. They are now rebuilt; review and commit them."
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
    echo "lint has $warnings warnings, under the ratchet of $max: lower --max-warnings in package.json to $warnings" >"$logs/lint.note"
  fi
  return $status
}

# Lint only the changed files. Warnings don't fail it, but they're counted, because they count
# towards the ratchet in the full run.
lint_changed() {
  # shellcheck disable=SC2086
  npx eslint --no-warn-ignored $lintable
  local status=$?
  local warnings
  warnings="$(grep -Eo '[0-9]+ warnings?\)' "$logs/lint.log" | grep -Eo '[0-9]+' | tail -1)"
  if [ $status -eq 0 ] && [ -n "$warnings" ] && [ "$warnings" -gt 0 ]; then
    echo "changed files have $warnings lint warnings (they count towards the ratchet; new ones fail the full run): see $logs/lint.log" >"$logs/lint.note"
  fi
  return $status
}

if [ "$mode" = full ]; then
  echo "check: full run ($changed_count files changed vs origin/main)"
else
  echo "check: --changed ($changed_count files changed vs origin/main)"
fi
[ -n "$base_note" ] && echo "  note  $base_note"

tokens_changed="$(printf '%s\n' "$changed_files" | grep -E '^(src/tokens/|src/styles/tokens|config/|scripts/palette|scripts/generate-palette)' || true)"
if [ "$mode" = full ] || [ -n "$tokens_changed" ]; then
  step tokens tail tokens_up_to_date
else
  skip tokens "no token sources or generated files changed"
fi

if [ "$mode" = full ]; then
  # Independent steps run side by side, then print in order
  run_step typecheck tsc npm run typecheck &
  run_step lint eslint lint_with_ratchet &
  run_step test jest npx jest --ci --maxWorkers=50% &
  run_step verify:docs tail npm run verify:docs &
  wait
  report typecheck lint test verify:docs
  if step build:package tail npm run build:package; then
    step verify:package tail npm run verify:package
  else
    skip verify:package "needs build:package"
  fi
else
  step typecheck tsc npm run typecheck
  lintable="$(printf '%s\n' "$changed_files" | grep -E '\.(tsx?|jsx?|mjs|cjs)$' || true)"
  if [ -n "$lintable" ]; then
    step lint eslint lint_changed
  else
    skip lint "no changed source files"
  fi
  testable="$(printf '%s\n' "$changed_files" | grep -E '\.(tsx?|jsx?|mjs|cjs|json)$' | grep -vE '^(e2e/|\.claude/|package(-lock)?\.json)' || true)"
  if [ -n "$testable" ]; then
    # shellcheck disable=SC2086
    step test jest npx jest --ci --passWithNoTests --findRelatedTests $testable
  else
    skip test "no changed files with related tests"
  fi
  step verify:docs tail npm run verify:docs
fi

[ -f "$logs/lint.note" ] && echo "  note  $(cat "$logs/lint.note")"

if [ -z "$failed_steps" ]; then
  if [ "$mode" = full ]; then
    echo "check: all passed (the docs site build, npm run build, isn't included)"
  else
    echo "check: all passed (--changed; run the full check before calling the change done)"
  fi
  # Keep the logs when a note points at one
  [ -f "$logs/lint.note" ] || rm -rf "$logs"
  exit 0
fi
echo "check: failed:$failed_steps"
exit 1
