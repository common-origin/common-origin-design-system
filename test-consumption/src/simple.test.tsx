import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SimpleTest } from './SimpleTest';

describe('Simple Package Test (No Components)', () => {
  it('should import and use tokens without React conflicts', () => {
    const { getByText } = render(<SimpleTest />);
    
    expect(getByText('Design System Token Test')).toBeInTheDocument();
    expect(getByText('If you can see this styled with design tokens, the package works!')).toBeInTheDocument();
    expect(getByText('Tokens are working correctly: ✅')).toBeInTheDocument();
  });
});