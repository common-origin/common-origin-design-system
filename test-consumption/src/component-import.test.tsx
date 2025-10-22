import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Import the theme and only the Button component
// Let's try importing just Button specifically to see if the issue is with the full import
describe('Individual Component Import Test', () => {
  it('should be able to import tokens without components', async () => {
    // This should work since we've proven it works
    const { tokens } = await import('@common-origin/design-system/tokens');
    expect(tokens.semantic.color.text.default).toBeDefined();
  });

  it('should test if the main import is the issue', async () => {
    // Let's see what happens when we try to import the main entry point
    try {
      const designSystem = await import('@common-origin/design-system');
      console.log('Main import successful, exported keys:', Object.keys(designSystem));
      expect(true).toBe(true); // If we get here, the import worked
    } catch (error) {
      console.log('Main import failed:', error.message);
      expect(error.message).toContain('withConfig'); // Expected error
    }
  });
});