#!/bin/bash

# Release helper for the Common Origin Design System.
# main is protected, so a release is two steps:
#
#   ./scripts/release.sh [patch|minor|major|X.Y.Z]   (npm run release:create)
#       Creates chore/release-X.Y.Z from main, bumps the version (the npm `version`
#       script adds the CHANGELOG.md entry), commits, pushes and opens a PR.
#
#   ./scripts/release.sh tag                         (npm run release:tag)
#       After the PR is merged: tags main as vX.Y.Z and pushes the tag, which
#       triggers the publish workflow (npm Trusted Publishing).

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

error() { echo -e "${RED}ERROR: $1${NC}" >&2; exit 1; }
success() { echo -e "${GREEN}✓ $1${NC}"; }
info() { echo -e "${BLUE}ℹ $1${NC}"; }

REPO_URL="https://github.com/common-origin/common-origin-design-system"

current_version() { node -p "require('./package.json').version"; }

require_clean_main() {
  [[ -z $(git status --porcelain) ]] || error "Working directory is not clean. Commit or stash changes first."
  [[ $(git branch --show-current) == "main" ]] || error "Run this from main (git switch main)."
  git fetch --quiet origin main --tags
  [[ $(git rev-parse HEAD) == $(git rev-parse origin/main) ]] || error "Local main differs from origin/main. Run: git pull"
  success "On an up-to-date, clean main"
}

tag_exists() { git rev-parse -q --verify "refs/tags/v$1" >/dev/null || git ls-remote --exit-code --tags origin "refs/tags/v$1" >/dev/null 2>&1; }

confirm() {
  read -p "$1 [y/N] " -n 1 -r
  echo
  [[ $REPLY =~ ^[Yy]$ ]]
}

create_release_pr() {
  local release_type=$1
  if [[ -z $release_type ]]; then
    echo "Select release type:"
    echo "  1) patch (bug fixes)"
    echo "  2) minor (new features)"
    echo "  3) major (breaking changes)"
    echo "  4) custom version"
    read -p "Enter choice [1-4]: " choice
    case $choice in
      1) release_type="patch" ;;
      2) release_type="minor" ;;
      3) release_type="major" ;;
      4) read -p "Enter new version (X.Y.Z): " release_type ;;
      *) error "Invalid choice" ;;
    esac
  fi

  require_clean_main
  info "Current version: v$(current_version)"

  # Preview the new version without running lifecycle scripts (so CHANGELOG.md isn't touched), then revert.
  npm version "$release_type" --no-git-tag-version --ignore-scripts >/dev/null 2>&1 || error "Invalid release type or version: $release_type"
  local new_version
  new_version=$(current_version)
  git checkout -- package.json package-lock.json
  [[ $new_version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || error "Unexpected version: $new_version"
  tag_exists "$new_version" && error "Tag v$new_version already exists"

  local last_tag
  last_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
  if [[ -n $last_tag ]]; then
    echo -e "\n${YELLOW}Commits since $last_tag:${NC}"
    git log "$last_tag"..HEAD --oneline --no-decorate | head -20
    echo ""
  fi

  confirm "Open a release PR for v$new_version?" || { info "Release cancelled"; exit 0; }

  local branch="chore/release-$new_version"
  git switch -c "$branch"
  npm version "$new_version" --no-git-tag-version  # runs the `version` script: adds and stages the CHANGELOG.md entry
  git add package.json package-lock.json CHANGELOG.md
  git commit -m "chore: bump version to $new_version"
  git push -u origin "$branch"
  success "Pushed $branch"

  if command -v gh >/dev/null 2>&1; then
    gh pr create --base main --head "$branch" --title "chore: bump version to $new_version" \
      --body "Version bump for **v$new_version**, including its \`CHANGELOG.md\` entry. After merge, run \`npm run release:tag\` on an up-to-date \`main\` to publish."
  else
    info "Open the PR: $REPO_URL/compare/main...$branch"
  fi

  echo ""
  info "Next: wait for CI, address any Copilot review comments, merge, then on main:"
  echo "    git switch main && git pull && npm run release:tag"
}

tag_release() {
  require_clean_main
  local version
  version=$(current_version)
  tag_exists "$version" && error "Tag v$version already exists. Bump the version with npm run release:create first."
  grep -q "^#### \[v$version\]" CHANGELOG.md || error "CHANGELOG.md has no v$version entry. Was the release PR merged?"

  info "main is at $(git rev-parse --short HEAD): $(git log -1 --format=%s)"
  echo -e "${YELLOW}Pushing v$version publishes to npm. This can't be undone.${NC}"
  confirm "Tag and publish v$version?" || { info "Cancelled"; exit 0; }

  git tag "v$version"
  git push origin "v$version"
  success "Pushed tag v$version"
  info "Publishing: $REPO_URL/actions/workflows/publish.yml"
  info "Then check: npm view @common-origin/design-system version"
}

case "$1" in
  tag) tag_release ;;
  *) create_release_pr "$1" ;;
esac
