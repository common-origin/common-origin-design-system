import type { ComponentDocumentation } from '@/lib/docgen/types'
import { useRef, useState } from 'react'
import { AgentInput, AgentInputHandle } from './AgentInput'
import { Button } from '../../atoms/Button'
import { Stack } from '../../atoms/Stack'

const FocusFromCodeExample = () => {
  const inputRef = useRef<AgentInputHandle>(null)
  const [value, setValue] = useState('')

  return (
    <Stack direction="column" gap="md">
      <div>
        <Button
          variant="secondary"
          onClick={() => {
            setValue('Friday: ')
            inputRef.current?.focus({ cursor: 'end' })
          }}
        >
          Change
        </Button>
      </div>
      <AgentInput ref={inputRef} value={value} onChange={setValue} onSubmit={async () => {}} />
    </Stack>
  )
}

export const agentInputDocs: ComponentDocumentation = {
  id: 'agent-input',
  name: 'AgentInput',
  description:
    'A chat-style single-line input with right-aligned in-field icon controls for voice capture and send, plus live status feedback, an active listening ring around the mic button, and auto-submit on final transcripts.',
  category: 'Molecules',

  props: [
    {
      name: 'onSubmit',
      type: "(payload: { text: string; source: 'text' | 'voice-final'; timestamp: string }) => void | Promise<void>",
      required: true,
      default: undefined,
      description:
        'Submission callback for text and voice-final sends, called on Enter, Send click, and a final voice transcript when enabled. Submit contract: when it resolves, the field clears if it still holds the submitted text (a follow-up typed while submitting is kept); when it rejects, the text stays so the user can retry. The field stays editable while it runs.',
    },
    {
      name: 'onStop',
      type: '() => void',
      required: false,
      default: undefined,
      description: 'While submitting, turns Send into a Stop button and lets Escape in the field stop. Cancel the request here; onSubmit then settles as usual. Without it, Send is disabled while submitting.',
    },
    {
      name: 'ref',
      type: "Ref<{ focus: (options?: { cursor?: 'start' | 'end' | 'all' }) => void; clear: () => void }>",
      required: false,
      default: undefined,
      description: 'Imperative handle (AgentInputHandle) for focusing or clearing the field from product controls. focus({ cursor: \'end\' }) puts the caret after text prefilled through value in the same handler.',
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
      description: 'External submitting state. If omitted, submitting state is inferred from async onSubmit resolution. The field stays editable while submitting; only Send is disabled (or becomes Stop with onStop).',
    },
    {
      name: 'enableVoice',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Enables Web Speech API voice capture when the browser supports it, with a voice icon control inside the input on the right. Where the API is unsupported (Firefox, many WebViews) the mic is hidden and nothing is shown in its place. The default changes to false in 3.0.',
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
      name: 'helperText',
      type: 'string',
      required: false,
      default: "''",
      description: 'Hint in the status line while idle or typing, in the product\'s voice. The status line is empty by default.',
    },
    {
      name: 'statusMessage',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Overrides the status line in every non-error state (idle, typing, listening, submitting), for example to report what the agent changed.',
    },
    {
      name: 'errorMessage',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Shown whenever it is set, in any state, styled as an error and announced by the status live region. Use it for request errors; clear it when the user retries. It also replaces the built-in submission and voice error text.',
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
    'semantic.color.text.muted',
    'semantic.color.text.danger',
    'semantic.color.fill.accent',
    'semantic.color.fill.accent-muted',
    'semantic.color.fill.accent-hover',
    'semantic.color.border.accent',
    'semantic.space.inset.lg',
    'component.input.default.backgroundColor',
    'component.input.default.borderWidth',
    'component.input.default.borderColor',
    'component.input.default.borderRadius',
    'component.input.focus.borderColor',
    'component.input.focus.outline',
    'semantic.border.focusOffset',
    'component.input.disabled.backgroundColor',
    'component.input.disabled.borderColor',
    'semantic.space.100',
    'semantic.space.200',
    'semantic.space.300',
    'semantic.space.400',
    'semantic.space.600',
    'semantic.size.control.lg', // Minimum height (decision 0034)
    'semantic.border.width.thin',
    'semantic.radius.xs',
    'semantic.radius.lg',
    // Motion
    'semantic.motion.duration.fast',
    'semantic.motion.duration.moderate',
    'semantic.motion.easing.decelerate',
    'semantic.motion.easing.standard',
  ],

  examples: [
    {
      name: 'Idle State',
      description: 'Default state with typing and send actions enabled. The status line is empty until a product sets helperText or statusMessage.',
      code: `<AgentInput onSubmit={async ({ text, source }) => {
  console.log('submitted', { text, source })
}} />`,
      renderComponent: () => <AgentInput onSubmit={async () => {}} />,
    },
    {
      name: 'Helper Text',
      description: 'A hint in the product\'s voice, shown while idle and typing.',
      code: `<AgentInput
  helperText="Tell me what to change, like “swap Tuesday for something lighter”"
  onSubmit={async ({ text }) => {
    await updatePlan(text)
  }}
/>`,
      renderComponent: () => (
        <AgentInput
          helperText="Tell me what to change, like “swap Tuesday for something lighter”"
          onSubmit={async () => {}}
        />
      ),
    },
    {
      name: 'Listening (Animated Ring)',
      description: 'Start voice input to show the animated circular blue gradient ring around the mic button while listening.',
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
      name: 'Listening (Reduced Motion)',
      description: 'With prefers-reduced-motion enabled, listening uses a static blue ring instead of animation.',
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
      description: 'A product-set error shows in any state, so a failed request can be reported without making onSubmit throw.',
      code: `const [error, setError] = useState<string>()

<AgentInput
  errorMessage={error}
  onSubmit={async ({ text }) => {
    setError(undefined)
    const response = await updatePlan(text)
    if (!response.ok) setError("Couldn't update the plan. Try again.")
  }}
/>`,
      renderComponent: () => (
        <AgentInput
          errorMessage="Couldn't update the plan. Try again."
          onSubmit={async () => {}}
        />
      ),
    },
    {
      name: 'Focus From Code',
      description: 'A product control prefills the field through value and focuses it with the caret at the end, using the ref handle.',
      code: `const inputRef = useRef<AgentInputHandle>(null)
const [value, setValue] = useState('')

<Button
  variant="secondary"
  onClick={() => {
    setValue('Friday: ')
    inputRef.current?.focus({ cursor: 'end' })
  }}
>
  Change
</Button>
<AgentInput ref={inputRef} value={value} onChange={setValue} onSubmit={updatePlan} />`,
      renderComponent: () => <FocusFromCodeExample />,
    },
    {
      name: 'Stop While Working',
      description: 'With onStop, Send becomes Stop while submitting, and Escape also stops. The field stays editable for a follow-up.',
      code: `<AgentInput
  isSubmitting={isGenerating}
  onStop={() => controller.abort()}
  onSubmit={({ text }) => generate(text)}
/>`,
      renderComponent: () => <AgentInput isSubmitting onStop={() => {}} onSubmit={async () => {}} />,
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
  ],

  accessibility: {
    notes: [
      'Input has an explicit accessible label via the label prop and aria-label.',
      'Voice toggle uses aria-pressed to communicate active listening state.',
      'While listening, the mic control shows a circular blue ring and remains visually distinct from idle state even without motion.',
      'Voice and send controls are icon-only buttons with explicit aria-labels for screen readers.',
      'Status line is exposed as a polite live region for listening/submitting/error announcements. A product-set errorMessage is announced whenever it appears.',
      'Enter does not submit while an IME composition is in progress, so Japanese, Chinese and Korean input is confirmed before sending.',
      'Escape stops active listening and returns to idle or typing flow. While submitting with onStop, Escape stops the request.',
      'The field keeps focus and stays editable while submitting, so keyboard and screen reader users are not moved away mid-task.',
      'Stop is an icon-only button labelled "Stop" that replaces Send in the same position, so focus order does not change.',
      'Reduced motion preference disables non-essential pulse and meter animation while preserving textual status updates.',
      'When reduced motion is enabled, the listening ring remains visible as a static blue ring.',
    ],
    keyboardNavigation: 'Tab order is input → voice toggle (when available) → send (or Stop while submitting with onStop). Enter submits text, Escape stops listening or, with onStop, stops a submission.',
    screenReader:
      'Live region announces helper text, listening, processing, submitting, and recoverable error feedback. Unsupported voice is not announced: the mic is simply absent.',
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
        tokens: ['semantic.size.control.lg'],
      },
      {
        name: 'Voice Toggle',
        description:
          'In-field start/stop icon control for microphone capture with active pressed semantics and a circular listening ring during active voice capture.',
        tokens: [
          'semantic.color.border.accent',
          'semantic.color.fill.accent',
          'semantic.color.fill.accent-muted',
          'semantic.color.fill.accent-hover',
        ],
      },
      {
        name: 'Send Button',
        description: 'In-field send icon control disabled when empty, disabled, or submitting.',
      },
      {
        name: 'Status Region',
        description: 'Live region for helper, processing, and actionable error announcements.',
        tokens: ['semantic.color.text.muted', 'semantic.color.text.danger'],
      },
      {
        name: 'Waveform Meter',
        description: 'Optional real-time audio level visualization shown while listening when reduced motion is not enabled.',
        tokens: ['semantic.color.fill.accent'],
      },
    ],
  },
}
