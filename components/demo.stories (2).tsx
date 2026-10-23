import { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { FormField, Input } from '@pega/cosmos-react-core';
import PegaExtensionsBooleanButton from './index';

/* No `title` on purpose: Storybook builds the sidebar name from the file path, so this file
   replaces your existing story (e.g. hanoverefolibrarybooleanbutton) instead of adding a second one. */
const meta = {
  component: PegaExtensionsBooleanButton,
  parameters: { layout: 'padded' },
  /* Order here = order in the Controls panel. Position controls come first. */
  argTypes: {
    // ---- Position (first, so they are always visible without scrolling) ----
    verticalAlign: {
      name: 'verticalAlign (Top / Center / Bottom)',
      control: 'inline-radio',
      options: ['top', 'center', 'bottom'],
      table: { category: 'Position' }
    },
    alignment: {
      name: 'alignment (Left / Center / Right)',
      control: 'inline-radio',
      options: ['left', 'center', 'right'],
      table: { category: 'Position' }
    },
    fullWidth: { control: 'boolean', table: { category: 'Position' } },

    // ---- Content ----
    label: { control: 'text', table: { category: 'Content' } },
    buttonLabel: { control: 'text', table: { category: 'Content' } },
    helperText: { control: 'text', table: { category: 'Content' } },
    validatemessage: { control: 'text', table: { category: 'Content' } },
    tooltip: { control: 'text', table: { category: 'Content' } },
    hideLabel: { control: 'boolean', table: { category: 'Content' } },

    // ---- Style ----
    variant: { control: 'select', options: ['primary', 'secondary', 'simple'], table: { category: 'Style' } },
    icon: {
      control: 'select',
      options: ['none', 'refresh', 'search', 'check', 'plus'],
      table: { category: 'Style' }
    },
    backgroundColor: { control: 'color', table: { category: 'Style' } },
    textColor: { control: 'color', table: { category: 'Style' } },
    borderRadius: { control: 'text', table: { category: 'Style' } },

    // ---- Behavior / state ----
    valueBehavior: { control: 'select', options: ['toggle', 'alwaysTrue'], table: { category: 'Behavior' } },
    required: { control: 'boolean', table: { category: 'Behavior' } },
    disabled: { control: 'boolean', table: { category: 'Behavior' } },
    readOnly: { control: 'boolean', table: { category: 'Behavior' } },

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
  inputLabel: { control: 'text', name: 'Input: label', table: { category: 'Demo text input' } },
  inputValue: { control: 'text', name: 'Input: value', table: { category: 'Demo text input' } },
  inputHelperText: { control: 'text', name: 'Input: helper text', table: { category: 'Demo text input' } },
  inputError: { control: 'text', name: 'Input: error message', table: { category: 'Demo text input' } },
  inputWidth: { control: 'text', name: 'Input: width (e.g. 16rem)', table: { category: 'Demo text input' } },
  rowHeight: {
    control: 'text',
    name: 'Row height (e.g. 8rem)',
    description: 'Makes top / center / bottom easier to see',
    table: { category: 'Demo text input' }
  }
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
