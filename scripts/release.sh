#!/bin/bash

# Release helper script for Common Origin Design System
# This script automates the manual steps of creating a release

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
error() {
  echo -e "${RED}ERROR: $1${NC}" >&2
  exit 1
}

success() {
  echo -e "${GREEN}✓ $1${NC}"
}

info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

warn() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if working directory is clean
check_clean_working_directory() {
  if [[ -n $(git status -s) ]]; then
    error "Working directory is not clean. Commit or stash changes first."
  fi
  success "Working directory is clean"
}

# Get current version from package.json
get_current_version() {
  node -p "require('./package.json').version"
}

# Validate version format
validate_version() {
  if [[ ! $1 =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    error "Invalid version format: $1 (expected: X.Y.Z)"
  fi
}

# Check if tag exists
tag_exists() {
  git tag -l "v$1" | grep -q "v$1"
}

# Main script
main() {
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BLUE}  Common Origin Design System - Release${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

  # Get release type from argument or prompt
  if [[ -n $1 ]]; then
    RELEASE_TYPE=$1
  else
    echo "Select release type:"
    echo "  1) patch (bug fixes)"
    echo "  2) minor (new features)"
    echo "  3) major (breaking changes)"
    echo "  4) custom version"
    read -p "Enter choice [1-4]: " choice

    case $choice in
      1) RELEASE_TYPE="patch" ;;
      2) RELEASE_TYPE="minor" ;;
      3) RELEASE_TYPE="major" ;;
      4) RELEASE_TYPE="custom" ;;
      *) error "Invalid choice" ;;
    esac
  fi

  # Check working directory
  info "Checking working directory..."
  check_clean_working_directory

  # Get current version
  CURRENT_VERSION=$(get_current_version)
  info "Current version: v$CURRENT_VERSION"

  # Calculate or prompt for new version
  if [[ $RELEASE_TYPE == "custom" ]]; then
    read -p "Enter new version (X.Y.Z): " NEW_VERSION
    validate_version "$NEW_VERSION"
  else
    # Use npm version to calculate new version (dry run)
    NEW_VERSION=$(npm version $RELEASE_TYPE --no-git-tag-version 2>/dev/null || error "Failed to calculate new version")
    NEW_VERSION=$(get_current_version)
    info "New version will be: v$NEW_VERSION"
    
    # Revert the change (we'll do it properly below)
    git checkout package.json package-lock.json 2>/dev/null || true
  fi

  # Check if tag already exists
  if tag_exists "$NEW_VERSION"; then
    error "Tag v$NEW_VERSION already exists"
  fi

  # Show commits since last tag
  LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
  if [[ -n $LAST_TAG ]]; then
    echo -e "\n${YELLOW}Commits since $LAST_TAG:${NC}"
    git log $LAST_TAG..HEAD --oneline --no-decorate | head -10
    echo ""
  fi

  # Confirm
  read -p "Create release v$NEW_VERSION? [y/N] " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    info "Release cancelled"
    exit 0
  fi

  # Update package.json version
  info "Updating package.json to v$NEW_VERSION..."
  if [[ $RELEASE_TYPE == "custom" ]]; then
    npm version $NEW_VERSION --no-git-tag-version
  else
    npm version $RELEASE_TYPE --no-git-tag-version
  fi
  success "Version updated in package.json"

  # Commit version bump
  info "Committing version bump..."
  git add package.json package-lock.json
  git commit -m "chore: bump version to $NEW_VERSION"
  success "Version bump committed"

  # Create tag
  info "Creating tag v$NEW_VERSION..."
  git tag "v$NEW_VERSION"
  success "Tag created"

  # Push
  info "Pushing to GitHub..."
  git push origin main
  git push origin "v$NEW_VERSION"
  success "Pushed commits and tag"

  # Done
  echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${GREEN}  Release v$NEW_VERSION created successfully!${NC}"
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

  info "GitHub Actions will now:"
  echo "  1. Run type checking"
  echo "  2. Build the package"
  echo "  3. Publish to npm"
  echo ""
  info "Monitor progress at: https://github.com/common-origin/common-origin-design-system/actions"
  echo ""
  info "Verify publication with: npm view @common-origin/design-system version"
}

# Run main script
main "$@"
