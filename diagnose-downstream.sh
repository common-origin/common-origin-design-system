#!/bin/bash
# Diagnostic script for downstream projects
# Run this in your downstream project to diagnose why design system updates aren't appearing

echo "=== Design System Downstream Diagnostic ==="
echo ""

echo "1. Checking installed version:"
npm list @common-origin/design-system 2>&1 | head -5
echo ""

echo "2. Checking what version is requested in package.json:"
cat package.json | grep "@common-origin/design-system"
echo ""

echo "3. Checking if node_modules has the package:"
if [ -d "node_modules/@common-origin/design-system" ]; then
  echo "✓ Package exists in node_modules"
  echo "  Version in node_modules:"
  cat node_modules/@common-origin/design-system/package.json | grep '"version"'
  echo ""
  echo "  Checking for dist/styles/tokens.json:"
  if [ -f "node_modules/@common-origin/design-system/dist/styles/tokens.json" ]; then
    echo "  ✓ tokens.json exists"
    echo "  Secondary button backgroundColor:"
    cat node_modules/@common-origin/design-system/dist/styles/tokens.json | grep -A 10 '"secondary"' | grep backgroundColor | head -1
  else
    echo "  ✗ tokens.json NOT FOUND"
  fi
  echo ""
  echo "  Checking for new icons:"
  if [ -f "node_modules/@common-origin/design-system/dist/types/icons.d.ts" ]; then
    echo "  ✓ icons.d.ts exists"
    echo "  Checking for 'cancel' icon:"
    cat node_modules/@common-origin/design-system/dist/types/icons.d.ts | grep -o "'cancel'" && echo "  ✓ Found 'cancel'" || echo "  ✗ 'cancel' not found"
    echo "  Checking for 'edit' icon:"
    cat node_modules/@common-origin/design-system/dist/types/icons.d.ts | grep -o "'edit'" && echo "  ✓ Found 'edit'" || echo "  ✗ 'edit' not found"
  else
    echo "  ✗ icons.d.ts NOT FOUND"
  fi
else
  echo "✗ Package NOT in node_modules"
fi
echo ""

echo "4. Checking lock file:"
if [ -f "package-lock.json" ]; then
  echo "Using npm (package-lock.json found)"
  echo "Version in lock file:"
  cat package-lock.json | grep -A 2 '"@common-origin/design-system"' | grep version | head -1
elif [ -f "yarn.lock" ]; then
  echo "Using yarn (yarn.lock found)"
  echo "Version in lock file:"
  grep -A 1 '@common-origin/design-system@' yarn.lock | grep version | head -1
elif [ -f "pnpm-lock.yaml" ]; then
  echo "Using pnpm (pnpm-lock.yaml found)"
else
  echo "✗ No lock file found"
fi
echo ""

echo "=== Recommendations ==="
echo ""
echo "If version is not 1.16.0, run:"
echo "  npm install @common-origin/design-system@1.16.0"
echo ""
echo "If version IS 1.16.0 but files are missing or wrong:"
echo "  rm -rf node_modules/.cache"
echo "  rm -rf node_modules/@common-origin"
echo "  npm install"
echo ""
echo "If using Next.js, also clear build cache:"
echo "  rm -rf .next"
echo ""
echo "If using Vite, also clear cache:"
echo "  rm -rf node_modules/.vite"
echo ""
