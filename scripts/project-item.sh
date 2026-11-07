#!/usr/bin/env bash
# Set fields on a design-system issue in the Design System Roadmap project board
# (https://github.com/users/common-origin/projects/1), adding the issue to the
# project first if it isn't there yet.
#
# Usage:
#   scripts/project-item.sh <issue-number> Field=Value [Field=Value ...]
#
# Examples:
#   scripts/project-item.sh 78 Status="In progress"
#   scripts/project-item.sh 78 Status="In review"
#   scripts/project-item.sh 91 Status=Backlog Priority=P2 Category=Bug Size=S
#   scripts/project-item.sh 84 Cycle="Cycle 7"
#
# Works for any single-select field (Status, Priority, Category, Size). Field
# and option names are looked up at run time, so this keeps working if options
# are renamed or re-created in the project UI.
#
# Cycle (the weekly iteration field) takes `current` or a cycle's title, such
# as "Cycle 7". Setting Status="In progress" also sets Cycle=current unless a
# Cycle is given, so the This cycle and Roadmap views fill themselves.
#
# All Field=Value pairs are validated before anything is written, so a typo
# never partially updates the board.
#
# Needs `jq`, and a gh token with the `project` scope (`gh auth refresh -s project`).
set -euo pipefail

OWNER="common-origin"
REPO="common-origin-design-system"
PROJECT_NUMBER=1

usage() {
  # Print the header comment block (everything after the shebang up to the first non-comment line).
  awk 'NR > 1 && /^#/ { sub(/^# ?/, ""); print; next } NR > 1 { exit }' "$0"
  exit 1
}

[[ $# -ge 2 ]] || usage
issue="$1"
shift
[[ "$issue" =~ ^[0-9]+$ ]] || { echo "error: issue number must be numeric, got '$issue'" >&2; exit 1; }
command -v jq >/dev/null || { echo "error: jq is required (e.g. brew install jq)" >&2; exit 1; }

project_id=$(gh project view "$PROJECT_NUMBER" --owner "$OWNER" --format json --jq '.id')
fields_json=$(gh project field-list "$PROJECT_NUMBER" --owner "$OWNER" --format json)

# Starting work puts it in the current cycle, unless the caller chose a cycle.
pairs=("$@")
if [[ " ${pairs[*]} " == *" Status=In progress "* && " ${pairs[*]} " != *" Cycle="* ]]; then
  pairs+=("Cycle=current")
fi

# Resolve every Field=Value pair up front; exit before any write if one is invalid.
names=() field_ids=() option_ids=() iteration_ids=()
for pair in "${pairs[@]}"; do
  [[ "$pair" == *=* ]] || { echo "error: expected Field=Value, got '$pair'" >&2; exit 1; }
  field="${pair%%=*}"
  value="${pair#*=}"

  if [[ "$field" == "Cycle" ]]; then
    cycle_json=$(gh api graphql -f query='query($id: ID!) { node(id: $id) { ... on ProjectV2 {
      field(name: "Cycle") { ... on ProjectV2IterationField { id configuration {
        iterations { id title startDate duration } } } } } } }' -f id="$project_id" \
      --jq '.data.node.field')
    if [[ "$value" == "current" ]]; then
      # A cycle runs from its start date for `duration` days, in local time.
      iteration_id=$(jq -r --arg today "$(date +%F)" '.configuration.iterations[]
        | select(.startDate <= $today and
            ((.startDate + "T00:00:00Z" | fromdate) + .duration * 86400 | strftime("%Y-%m-%d")) > $today)
        | .id' <<<"$cycle_json")
    else
      iteration_id=$(jq -r --arg v "$value" '.configuration.iterations[] | select(.title == $v) | .id' <<<"$cycle_json")
    fi
    if [[ -z "$iteration_id" ]]; then
      echo "error: no cycle matches '$value'. Current and upcoming cycles:" >&2
      jq -r '.configuration.iterations[] | "  " + .title + " (from " + .startDate + ")"' <<<"$cycle_json" >&2
      exit 1
    fi
    names+=("Cycle → $value")
    field_ids+=("$(jq -r '.id' <<<"$cycle_json")")
    option_ids+=("")
    iteration_ids+=("$iteration_id")
    continue
  fi

  field_id=$(jq -r --arg f "$field" '.fields[] | select(.name == $f and .options != null) | .id' <<<"$fields_json")
  if [[ -z "$field_id" ]]; then
    echo "error: no single-select field named '$field'. Available:" >&2
    jq -r '.fields[] | select(.options != null) | "  " + .name' <<<"$fields_json" >&2
    exit 1
  fi

  option_id=$(jq -r --arg f "$field" --arg v "$value" \
    '.fields[] | select(.name == $f) | .options[] | select(.name == $v) | .id' <<<"$fields_json")
  if [[ -z "$option_id" ]]; then
    echo "error: '$value' isn't an option of $field. Options:" >&2
    jq -r --arg f "$field" '.fields[] | select(.name == $f) | .options[] | "  " + .name' <<<"$fields_json" >&2
    exit 1
  fi

  names+=("$field → $value")
  field_ids+=("$field_id")
  option_ids+=("$option_id")
  iteration_ids+=("")
done

item_id=$(gh project item-add "$PROJECT_NUMBER" --owner "$OWNER" \
  --url "https://github.com/$OWNER/$REPO/issues/$issue" --format json --jq '.id')

for i in "${!field_ids[@]}"; do
  if [[ -n "${iteration_ids[$i]}" ]]; then
    gh project item-edit --id "$item_id" --project-id "$project_id" \
      --field-id "${field_ids[$i]}" --iteration-id "${iteration_ids[$i]}" >/dev/null
  else
    gh project item-edit --id "$item_id" --project-id "$project_id" \
      --field-id "${field_ids[$i]}" --single-select-option-id "${option_ids[$i]}" >/dev/null
  fi
  echo "#$issue: ${names[$i]}"
done
