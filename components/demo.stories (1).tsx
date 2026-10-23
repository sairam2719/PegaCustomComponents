import { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { Flex, FormField, Input } from '@pega/cosmos-react-core';
import PegaExtensionsBooleanButton from './index';

const meta = {
  title: 'Extensions/Boolean button',
  component: PegaExtensionsBooleanButton,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    buttonLabel: { control: 'text' },
    helperText: { control: 'text' },
    validatemessage: { control: 'text' },
    tooltip: { control: 'text' },
    hideLabel: { control: 'boolean' },
    verticalAlign: {
      name: 'verticalAlign (button position in row)',
      control: 'select',
      options: ['bottom', 'inputLine', 'top']
    },
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

/* Fake getPConnect: clicking the button writes the value back into story state */
const useFakePConnect = (setValue: (v: boolean) => void) => () => ({
  getStateProps: () => ({ value: '.RefreshFlag' }),
  getActionsApi: () => ({
    updateFieldValue: (_p: string, v: boolean) => setValue(v),
    triggerFieldChange: () => {}
  })
});

/* ---------- Text input controls (shown in the Controls panel of the stories below) ---------- */
type RowArgs = {
  inputLabel: string;
  inputValue: string;
  inputHelperText: string;
  inputError: string;
  inputWidth: string;
  [key: string]: any;
};

const inputArgTypes = {
  inputLabel: { control: 'text', name: 'Input: label' },
  inputValue: { control: 'text', name: 'Input: value' },
  inputHelperText: { control: 'text', name: 'Input: helper text' },
  inputError: { control: 'text', name: 'Input: error message' },
  inputWidth: { control: 'text', name: 'Input: width (e.g. 16rem)' }
};

const inputArgs = {
  inputLabel: 'Quote number',
  inputValue: 'Q-10045',
  inputHelperText: '',
  inputError: '',
  inputWidth: '16rem'
};

/* A text input like "Quote number" */
const TextInput = ({ inputLabel, inputValue, inputHelperText, inputError, inputWidth }: RowArgs) => {
  const [text, setText] = useState<string>(inputValue);
  return (
    <div style={{ width: inputWidth || undefined }}>
      <FormField
        label={inputLabel}
        info={inputError || inputHelperText || undefined}
        status={inputError ? 'error' : undefined}
      >
        <Input value={text} onChange={(e: any) => setText(e.target.value)} />
      </FormField>
    </div>
  );
};

/* ---------- 1. Default: button beside a text input (change verticalAlign in Controls) ---------- */
const BesideInputDemo = (args: RowArgs) => {
  const { inputLabel, inputValue, inputHelperText, inputError, inputWidth, ...buttonArgs } = args;
  const [value, setValue] = useState<boolean>(false);
  const getPConnect = useFakePConnect(setValue);
  return (
    <>
      <Flex container={{ gap: 2, alignItems: 'stretch' }}>
        <TextInput {...args} />
        <PegaExtensionsBooleanButton {...(buttonArgs as any)} value={value} getPConnect={getPConnect} />
      </Flex>
      <p>Property value: {String(value)}</p>
    </>
  );
};

export const Default: StoryObj<typeof BesideInputDemo> = {
  render: (args: any) => <BesideInputDemo {...args} />,
  argTypes: inputArgTypes as any,
  args: {
    ...inputArgs,
    // button
    label: '',
    buttonLabel: 'Search',
    helperText: '',
    hideLabel: true,
    verticalAlign: 'bottom',
    variant: 'primary',
    alignment: 'left',
    icon: 'search',
    fullWidth: false,
    valueBehavior: 'toggle'
  }
};

/* ---------- 2. All three vertical positions side by side ---------- */
const CompareDemo = (args: RowArgs) => {
  const { inputLabel, inputValue, inputHelperText, inputError, inputWidth, ...buttonArgs } = args;
  const [value, setValue] = useState<boolean>(false);
  const getPConnect = useFakePConnect(setValue);
  const rows = [
    { key: 'bottom', title: 'bottom - bottom of row' },
    { key: 'inputLine', title: 'inputLine - invisible label row' },
    { key: 'top', title: 'top - flush at the top' }
  ];
  return (
    <>
      {rows.map(r => (
        <div key={r.key} style={{ marginBottom: '1.5rem' }}>
          <strong>{r.title}</strong>
          <Flex container={{ gap: 2, alignItems: 'stretch' }}>
            <TextInput {...args} />
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
  argTypes: inputArgTypes as any,
  args: {
    ...inputArgs,
    label: '',
    buttonLabel: 'Search',
    hideLabel: true,
    icon: 'search'
  }
};

/* ---------- 3. Standalone button with a visible label and helper text ---------- */
const StandaloneDemo = (args: any) => {
  const [value, setValue] = useState<boolean>(false);
  const getPConnect = useFakePConnect(setValue);
  return (
    <>
      <PegaExtensionsBooleanButton {...args} value={value} getPConnect={getPConnect} />
      <p>Property value: {String(value)}</p>
    </>
  );
};

export const StandaloneWithLabel: StoryObj<typeof PegaExtensionsBooleanButton> = {
  render: (args: any) => <StandaloneDemo {...args} />,
  args: {
    label: 'Results',
    buttonLabel: 'Evaluate Policy',
    helperText: 'Click to refresh the policy results',
    hideLabel: false,
    verticalAlign: 'bottom',
    variant: 'primary',
    alignment: 'left',
    icon: 'none',
    fullWidth: false,
    valueBehavior: 'toggle'
  }
};
