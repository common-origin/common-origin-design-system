import type { ComponentDocumentation } from '@/lib/docgen/types'
import { AgentInput } from './AgentInput'
import { Stack } from '@/components/atoms/Stack'

export const agentInputDocs: ComponentDocumentation = {
  id: 'agent-input',
  name: 'AgentInput',
  description:
    'A chat-style single-line input with right-aligned in-field icon controls for voice capture and send, plus live status feedback and auto-submit on final transcripts.',
  category: 'Molecules',

  props: [
    {
      name: 'onSubmit',
      type: "(payload: { text: string; source: 'text' | 'voice-final'; timestamp: string }) => void | Promise<void>",
      required: true,
      default: undefined,
      description: 'Submission callback for text and voice-final sends. Called on Enter, Send click, and successful voice final capture when enabled.',
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Controlled input value. Use with onChange for controlled mode.',
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      default: "''",
      description: 'Initial value for uncontrolled mode.',
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      default: undefined,
      description: 'Fires when typed text changes or when component updates text after voice interactions.',
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: "'Ask a question'",
      description: 'Placeholder shown in the text input.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables text entry, mic control, and send action.',
    },
    {
      name: 'isSubmitting',
      type: 'boolean',
      required: false,
      default: undefined,
      description: 'External submitting state. If omitted, submitting state is inferred from async onSubmit resolution.',
    },
    {
      name: 'enableVoice',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Enables Web Speech API voice capture path when supported by the browser. When supported, a voice icon control appears inside the input on the right.',
    },
    {
      name: 'autoSubmitOnVoiceFinal',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Automatically submits non-empty final transcript with source="voice-final".',
    },
    {
      name: 'voiceLanguage',
      type: 'string',
      required: false,
      default: "'en-AU'",
      description: 'Language passed to speech recognition (for example en-AU).',
    },
    {
      name: 'noSpeechTimeoutMs',
      type: 'number',
      required: false,
      default: '8000',
      description: 'Milliseconds to wait before no-speech guidance is shown and listening is stopped.',
    },
    {
      name: 'statusMessage',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Optional custom status text override for non-error states.',
    },
    {
      name: 'errorMessage',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Optional custom error text override for error state.',
    },
    {
      name: 'onVoiceStart',
      type: '() => void',
      required: false,
      default: undefined,
      description: 'Fires when voice listening starts.',
    },
    {
      name: 'onVoiceStop',
      type: '() => void',
      required: false,
      default: undefined,
      description: 'Fires when voice listening stops manually or due to completion/error.',
    },
    {
      name: 'onVoiceInterim',
      type: '(text: string) => void',
      required: false,
      default: undefined,
      description: 'Fires as interim transcript updates are received.',
    },
    {
      name: 'onVoiceFinal',
      type: '(text: string) => void',
      required: false,
      default: undefined,
      description: 'Fires when a final transcript is captured.',
    },
    {
      name: 'onVoiceError',
      type: "(error: { code: 'not-supported' | 'not-allowed' | 'no-speech' | 'audio-capture' | 'aborted' | 'unknown'; message: string }) => void",
      required: false,
      default: undefined,
      description: 'Fires when voice recognition fails or times out.',
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      default: "'Agent input'",
      description: 'Accessible label announced for the input control.',
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Test identifier for automated testing.',
    },
  ],

  tokens: [
    'semantic.color.text.subdued',
    'semantic.color.text.error',
    'semantic.color.background.interactive',
    'semantic.color.border.interactive',
    'component.input.default.paddingY',
    'component.input.default.paddingX',
    'component.input.default.backgroundColor',
    'component.input.default.borderWidth',
    'component.input.default.borderColor',
    'component.input.default.borderRadius',
    'component.input.focus.borderColor',
    'component.input.focus.outline',
    'component.input.focus.outlineOffset',
    'component.input.disabled.backgroundColor',
    'component.input.disabled.borderColor',
    'base.spacing[1]',
    'base.spacing[2]',
    'base.spacing[3]',
    'base.spacing[4]',
    'base.spacing[6]',
    'base.spacing[12]',
    'base.border.width[1]',
    'base.border.radius[1]',
    'base.border.radius[4]',
  ],

  examples: [
    {
      name: 'Idle State',
      description: 'Default state with typing and send actions enabled.',
      code: `<AgentInput onSubmit={async ({ text, source }) => {
  console.log('submitted', { text, source })
}} />`,
      renderComponent: () => <AgentInput onSubmit={async () => {}} />,
    },
    {
      name: 'Listening State Guidance',
      description: 'Listening copy shown while voice capture is active.',
      code: `<AgentInput
  statusMessage="Listening… speak now"
  onSubmit={async ({ text, source }) => {
    console.log(text, source)
  }}
/>`,
      renderComponent: () => (
        <AgentInput
          statusMessage="Listening… speak now"
          onSubmit={async () => {}}
        />
      ),
    },
    {
      name: 'Error State',
      description: 'Custom actionable error message for recovery guidance.',
      code: `<AgentInput
  errorMessage="Microphone permission denied. Allow access and try again."
  onSubmit={async ({ text, source }) => {
    console.log(text, source)
  }}
/>`,
      renderComponent: () => (
        <AgentInput
          errorMessage="Microphone permission denied. Allow access and try again."
          onSubmit={async () => {}}
        />
      ),
    },
    {
      name: 'Submitting State',
      description: 'External loading control while parent request is in flight.',
      code: `<AgentInput
  isSubmitting
  defaultValue="Transfer $200 to savings"
  onSubmit={async ({ text, source }) => {
    console.log(text, source)
  }}
/>`,
      renderComponent: () => (
        <AgentInput
          isSubmitting
          defaultValue="Transfer $200 to savings"
          onSubmit={async () => {}}
        />
      ),
    },
    {
      name: 'Voice Disabled',
      description: 'Text-only mode when voice input is disabled by product configuration.',
      code: `<AgentInput
  enableVoice={false}
  placeholder="Type a transfer command"
  onSubmit={async ({ text, source }) => {
    console.log(text, source)
  }}
/>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <AgentInput
            enableVoice={false}
            placeholder="Type a transfer command"
            onSubmit={async () => {}}
          />
        </Stack>
      ),
    },
  ],

  accessibility: {
    notes: [
      'Input has an explicit accessible label via the label prop and aria-label.',
      'Voice toggle uses aria-pressed to communicate active listening state.',
      'Voice and send controls are icon-only buttons with explicit aria-labels for screen readers.',
      'Status line is exposed as a polite live region for listening/submitting/error announcements.',
      'Escape stops active listening and returns to idle or typing flow.',
      'Reduced motion preference disables non-essential pulse and meter animation while preserving textual status updates.',
    ],
    keyboardNavigation: 'Tab order is input → voice toggle (when available) → send. Enter submits text, Escape stops listening.',
    screenReader:
      'Live region announces listening, processing, submitting, unsupported voice guidance, and recoverable error feedback.',
  },

  anatomy: {
    description: 'AgentInput uses a single bordered input shell with right-aligned icon controls and a persistent status region below for state and guidance feedback.',
    diagram: `
┌──────────────────────────────────────────────────────────────┐
  │ Input Shell                                                   │
  │ ┌──────────────────────────────────────────────────────────┐  │
  │ │ Text Input Area                      [Voice] [Send]     │  │
  │ └──────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│ Status Row                                                   │
│ Listening / Error / Help text          [Waveform meter]      │
└──────────────────────────────────────────────────────────────┘
`,
    parts: [
      {
        name: 'Text Input',
        description: 'Primary single-line entry point for typed and interim voice transcript text.',
        tokens: ['base.spacing[12]'],
      },
      {
        name: 'Voice Toggle',
        description: 'In-field start/stop icon control for microphone capture with active pressed semantics.',
        tokens: ['semantic.color.border.interactive'],
      },
      {
        name: 'Send Button',
        description: 'In-field send icon control disabled when empty, disabled, or submitting.',
      },
      {
        name: 'Status Region',
        description: 'Live region for helper, processing, and actionable error announcements.',
        tokens: ['semantic.color.text.subdued', 'semantic.color.text.error'],
      },
      {
        name: 'Waveform Meter',
        description: 'Optional real-time audio level visualization shown while listening when reduced motion is not enabled.',
        tokens: ['semantic.color.background.interactive'],
      },
    ],
  },
}
