import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { describe, it, expect } from 'vitest';
import { Button } from '@common-origin/design-system';

const theme = {}; // Empty theme for basic testing

describe('Component Rendering Test', () => {
  it('should render Button component successfully', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Button>Test Button</Button>
      </ThemeProvider>
    );
    
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  it('should handle Button with props', () => {
    const handleClick = () => {};
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Button variant="secondary" onClick={handleClick}>
          Secondary Button
        </Button>
      </ThemeProvider>
    );
    
    expect(getByText('Secondary Button')).toBeInTheDocument();
  });
});