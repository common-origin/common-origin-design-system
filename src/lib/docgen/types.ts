// Stub for component documentation types
// This allows .docs.tsx files to compile

export interface ComponentDocumentation {
  id: string;
  name: string;
  description: string;
  category: 'Atoms' | 'Molecules' | 'Organisms' | 'Layout';
  props?: Array<{
    name: string;
    type: string;
    required?: boolean;
    default?: string;
    defaultValue?: string;
    description?: string;
  }>;
  tokens?: Array<string | {
    name: string;
    value: string;
    description?: string;
  }>;
  examples?: Array<{
    name: string;
    code: string;
    description?: string;
    renderComponent?: () => React.ReactNode;
  }>;
}
