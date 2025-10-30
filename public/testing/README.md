# Testing & Validation Tools

This folder contains testing and validation utilities for the Common Origin website. These tools help verify that features are working correctly during development.

## Files

### Hotjar Testing
- **`hotjar-verification.html`** - Comprehensive Hotjar verification tool with status checks and event testing
- **`hotjar-direct-test.html`** - Simple test using traditional Hotjar script method
- **`hotjar-test.tsx`** - React component for Hotjar testing (Next.js page)

## Usage

### Testing Hotjar Integration

1. **Comprehensive Verification**:
   ```
   Open: http://localhost:3000/testing/hotjar-verification.html
   ```
   - Checks if Hotjar is loaded
   - Tests custom events
   - Provides links to test all pages
   - Shows verification checklist

2. **Direct Script Test**:
   ```
   Open: http://localhost:3000/testing/hotjar-direct-test.html
   ```
   - Tests traditional Hotjar implementation
   - Useful for comparing with npm package method

3. **React Component Test**:
   - Move `hotjar-test.tsx` to `pages/` temporarily if needed
   - Access at: `http://localhost:3000/hotjar-test`

## Browser Console Debugging

When testing Hotjar, check the browser console for debug messages:
- ✅ Success messages indicate proper initialization
- ⚠️ Warning messages suggest delays or issues
- ❌ Error messages indicate initialization failures

## Common Issues & Solutions

1. **Not Working in Development**:
   - Check if domain is allowed in Hotjar settings
   - Disable ad blockers/privacy extensions
   - Verify site ID (3789301) is active

2. **Console Errors**:
   - Network tab should show requests to `static.hotjar.com`
   - Check for CORS or network connectivity issues

3. **Production vs Development**:
   - Hotjar typically works better on production domains
   - Consider testing on staging environment

## Notes

- These files are for development/testing only
- Do not deploy testing tools to production
- Keep this folder in `.gitignore` if needed for security
