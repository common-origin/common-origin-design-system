import React from 'react';
import { tokens } from '@common-origin/design-system/tokens';

// Test just tokens without components to verify the package works
export const SimpleTest: React.FC = () => {
  return (
    <div>
      <h1 style={{ color: tokens.semantic.color.text.default }}>
        Design System Token Test
      </h1>
      <p style={{ 
        color: tokens.semantic.color.text.subdued,
        font: tokens.semantic.typography.body
      }}>
        If you can see this styled with design tokens, the package works!
      </p>
      <div style={{
        backgroundColor: tokens.semantic.color.background.surface,
        padding: tokens.semantic.spacing.layout.lg,
        borderRadius: '8px',
        marginTop: tokens.semantic.spacing.layout.sm
      }}>
        Tokens are working correctly: ✅
      </div>
    </div>
  );
};