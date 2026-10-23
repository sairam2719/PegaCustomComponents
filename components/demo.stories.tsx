import { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { Flex, FormField, Input } from '@pega/cosmos-react-core';
import PegaExtensionsBooleanButton from './index';

const meta = {
  title: 'Extensions/Boolean button',
  component: PegaExtensionsBooleanButton,
  argTypes: {
    label: { control: 'text' },
    buttonLabel: { control: 'text' },
    helperText: { control: 'text' },
    validatemessage: { control: 'text' },
    tooltip: { control: 'text' },
    hideLabel: { control: 'boolean' },
    verticalAlign: { control: 'select', options: ['bottom', 'inputLine', 'top'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    variant: { control: 'select', options: ['primary', 'secondary', 'simple'] },
    alignment: { control: 'select', options: ['left', 'center', 'right'] },
    icon: { control: 'select', options: ['none', 'refresh', 'search', 'check', 'plus'] },
    valueBehavior: { control: 'select', options: ['toggle', 'alwaysTrue'] },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    borderRadius: { control: 'text' },
    // not editable in the controls panel
    value: { table: { disable: true } },
    getPConnect: { table: { disable: true } },
    testId: { table: { disable: true } },
    displayMode: { table: { disable: true } }
  }
};

export default meta;

type Story = StoryObj<typeof PegaExtensionsBooleanButton>;

/* Fake getPConnect: clicking the button writes the value back into story state */
const useFakePConnect = (setValue: (v: boolean) => void) => () => ({
  getStateProps: () => ({ value: '.RefreshFlag' }),
  getActionsApi: () => ({
    updateFieldValue: (_p: string, v: boolean) => setValue(v),
    triggerFieldChange: () => {}
  })
});

const Demo = (args: any) => {
  const [value, setValue] = useState<boolean>(false);
  const getPConnect = useFakePConnect(setValue);
  return (
    <>
      <PegaExtensionsBooleanButton {...args} value={value} getPConnect={getPConnect} />
      <p>Property value: {String(value)}</p>
    </>
  );
};

export const Default: Story = {
  render: (args: any) => <Demo {...args} />,
  args: {
    label: 'Results',
    buttonLabel: 'Evaluate Policy',
    helperText: 'Click to refresh the policy results',
    hideLabel: false,
    variant: 'primary',
    alignment: 'left',
    icon: 'none',
    fullWidth: false,
    valueBehavior: 'toggle'
  }
};

/* ---------- Vertical alignment next to a text input ----------
   Button beside a text input (like Quote number in Pega). The user can change the
   button's "Vertical position in row" and the text input's label, value, helper text,
   error message and width from the Controls panel to see how the button lines up. */

type AlignedArgs = {
  inputLabel: string;
  inputValue: string;
  inputHelperText: string;
  inputError: string;
  inputWidth: string;
  [key: string]: any;
};

const alignedArgTypes = {
  inputLabel: { control: 'text', name: 'Input: label' },
  inputValue: { control: 'text', name: 'Input: value' },
  inputHelperText: { control: 'text', name: 'Input: helper text' },
  inputError: { control: 'text', name: 'Input: error message' },
  inputWidth: { control: 'text', name: 'Input: width (e.g. 16rem)' }
};

const AlignedDemo = ({
  inputLabel,
  inputValue,
  inputHelperText,
  inputError,
  inputWidth,
  ...buttonArgs
}: AlignedArgs) => {
  const [value, setValue] = useState<boolean>(false);
  const [text, setText] = useState<string>(inputValue);
  const getPConnect = useFakePConnect(setValue);
  return (
    <>
      {/* alignItems: 'stretch' mimics a Pega form row where the fields share the row height */}
      <Flex container={{ gap: 2, alignItems: 'stretch' }}>
        <div style={{ width: inputWidth || undefined }}>
          <FormField
            label={inputLabel}
            info={inputError || inputHelperText || undefined}
            status={inputError ? 'error' : undefined}
          >
            <Input value={text} onChange={(e: any) => setText(e.target.value)} />
          </FormField>
        </div>
        <PegaExtensionsBooleanButton {...(buttonArgs as any)} value={value} getPConnect={getPConnect} />
      </Flex>
      <p>Property value: {String(value)}</p>
    </>
  );
};

export const VerticalAlignmentBesideInput: StoryObj<typeof AlignedDemo> = {
  render: (args: any) => <AlignedDemo {...args} />,
  argTypes: alignedArgTypes as any,
  args: {
    // text input (left)
    inputLabel: 'Quote number',
    inputValue: 'Q-10045',
    inputHelperText: '',
    inputError: '',
    inputWidth: '16rem',
    // button (right): change "verticalAlign" from Controls
    label: '',
    buttonLabel: 'Search',
    hideLabel: true,
    verticalAlign: 'bottom',
    icon: 'search'
  }
};

/* All three vertical positions side by side for comparison */
const CompareDemo = ({
  inputLabel,
  inputValue,
  inputHelperText,
  inputError,
  inputWidth,
  ...buttonArgs
}: AlignedArgs) => {
  const [value, setValue] = useState<boolean>(false);
  const getPConnect = useFakePConnect(setValue);
  const rows = [
    { key: 'bottom', title: 'Bottom of row' },
    { key: 'inputLine', title: 'Match input line (invisible label)' },
    { key: 'top', title: 'Top (no space)' }
  ];
  return (
    <>
      {rows.map(r => (
        <div key={r.key} style={{ marginBottom: '1.5rem' }}>
          <strong>{r.title}</strong>
          <Flex container={{ gap: 2, alignItems: 'stretch' }}>
            <div style={{ width: inputWidth || undefined }}>
              <FormField
                label={inputLabel}
                info={inputError || inputHelperText || undefined}
                status={inputError ? 'error' : undefined}
              >
                <Input value={inputValue} onChange={() => {}} />
              </FormField>
            </div>
            <PegaExtensionsBooleanButton
              {...(buttonArgs as any)}
              verticalAlign={r.key}
              value={value}
              getPConnect={getPConnect}
            />
          </Flex>
        </div>
      ))}
    </>
  );
};

export const CompareVerticalAlignments: StoryObj<typeof CompareDemo> = {
  render: (args: any) => <CompareDemo {...args} />,
  argTypes: alignedArgTypes as any,
  args: {
    inputLabel: 'Quote number',
    inputValue: 'Q-10045',
    inputHelperText: '',
    inputError: '',
    inputWidth: '16rem',
    label: '',
    buttonLabel: 'Search',
    hideLabel: true,
    icon: 'search'
  }
};
