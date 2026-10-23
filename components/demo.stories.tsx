import { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { FormField, Input } from '@pega/cosmos-react-core';
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
    alignment: {
      name: 'alignment (horizontal)',
      control: 'inline-radio',
      options: ['left', 'center', 'right']
    },
    verticalAlign: {
      name: 'verticalAlign (vertical)',
      control: 'inline-radio',
      options: ['top', 'center', 'bottom']
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    variant: { control: 'select', options: ['primary', 'secondary', 'simple'] },
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

/* ---------- Text input controls (the input the button sits beside) ---------- */
type RowArgs = {
  inputLabel: string;
  inputValue: string;
  inputHelperText: string;
  inputError: string;
  inputWidth: string;
  rowHeight: string;
  [key: string]: any;
};

const rowArgTypes = {
  inputLabel: { control: 'text', name: 'Input: label' },
  inputValue: { control: 'text', name: 'Input: value' },
  inputHelperText: { control: 'text', name: 'Input: helper text' },
  inputError: { control: 'text', name: 'Input: error message' },
  inputWidth: { control: 'text', name: 'Input: width (e.g. 16rem)' },
  rowHeight: { control: 'text', name: 'Row height (e.g. 8rem) - makes top/center/bottom easier to see' }
};

const rowArgs = {
  inputLabel: 'Quote number',
  inputValue: 'Q-10045',
  inputHelperText: '',
  inputError: '',
  inputWidth: '16rem',
  rowHeight: ''
};

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

/* A form row: fields share the row height, like a Pega form row */
const Row = ({ rowHeight, children }: { rowHeight?: string; children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      alignItems: 'stretch',
      minHeight: rowHeight || undefined,
      outline: '1px dashed #b9c2cc'
    }}
  >
    {children}
  </div>
);

/* ---------- 1. Default: button beside a text input. Change verticalAlign in Controls ---------- */
const BesideInputDemo = (args: RowArgs) => {
  const { inputLabel, inputValue, inputHelperText, inputError, inputWidth, rowHeight, ...buttonArgs } = args;
  const [value, setValue] = useState<boolean>(false);
  const getPConnect = useFakePConnect(setValue);
  return (
    <>
      <Row rowHeight={rowHeight}>
        <TextInput {...args} />
        <PegaExtensionsBooleanButton {...(buttonArgs as any)} value={value} getPConnect={getPConnect} />
      </Row>
      <p>Property value: {String(value)}</p>
    </>
  );
};

export const Default: StoryObj<typeof BesideInputDemo> = {
  render: (args: any) => <BesideInputDemo {...args} />,
  argTypes: rowArgTypes as any,
  args: {
    ...rowArgs,
    // button
    label: '',
    buttonLabel: 'Search',
    helperText: '',
    hideLabel: true,
    alignment: 'left',
    verticalAlign: 'bottom',
    variant: 'primary',
    icon: 'search',
    fullWidth: false,
    valueBehavior: 'toggle'
  }
};

/* ---------- 2. Top / Center / Bottom side by side ---------- */
const CompareDemo = (args: RowArgs) => {
  const { inputLabel, inputValue, inputHelperText, inputError, inputWidth, rowHeight, ...buttonArgs } = args;
  const [value, setValue] = useState<boolean>(false);
  const getPConnect = useFakePConnect(setValue);
  const rows = ['top', 'center', 'bottom'];
  return (
    <>
      {rows.map(v => (
        <div key={v} style={{ marginBottom: '1.5rem' }}>
          <strong>verticalAlign: {v}</strong>
          <Row rowHeight={rowHeight}>
            <TextInput {...args} />
            <PegaExtensionsBooleanButton
              {...(buttonArgs as any)}
              verticalAlign={v}
              value={value}
              getPConnect={getPConnect}
            />
          </Row>
        </div>
      ))}
    </>
  );
};

export const CompareTopCenterBottom: StoryObj<typeof CompareDemo> = {
  render: (args: any) => <CompareDemo {...args} />,
  argTypes: rowArgTypes as any,
  args: {
    ...rowArgs,
    rowHeight: '6rem',
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
    alignment: 'left',
    verticalAlign: 'bottom',
    variant: 'primary',
    icon: 'none',
    fullWidth: false,
    valueBehavior: 'toggle'
  }
};
