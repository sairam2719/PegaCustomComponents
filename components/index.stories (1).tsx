import { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import HanoverEFOLibraryBooleanButton from './index';
const meta = {
  title: 'HanoverEFOLibraryBooleanButton',
  component: HanoverEFOLibraryBooleanButton,
  argTypes: {
    label: { control: 'text' },
    buttonLabel: { control: 'text' },
    helperText: { control: 'text' },
    validatemessage: { control: 'text' },
    tooltip: { control: 'text' },
    hideLabel: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    variant: { control: 'select', options: ['primary', 'secondary', 'simple'] },
    alignment: { control: 'select', options: ['left', 'center', 'right'] },
    icon: { control: 'select', options: ['none', 'refresh', 'search', 'check', 'plus'] },
    valueBehavior: { control: 'select', options: ['toggle', 'alwaysTrue'] },
    displayValue: { control: 'select', options: ['Yes/No', 'True/False'] },
    displayMode: {
      control: 'select',
      options: ['', 'DISPLAY_ONLY', 'LABELS_LEFT', 'STACKED_LARGE_VAL']
    },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    borderRadius: { control: 'text' },
    // not editable in the controls panel
    value: { table: { disable: true } },
    getPConnect: { table: { disable: true } },
    testId: { table: { disable: true } }
  }
};
export default meta;
type Story = StoryObj<typeof HanoverEFOLibraryBooleanButton>;
const Demo = (args: any) => {
  const [value, setValue] = useState<boolean>(args.initialValue ?? false);
  const getPConnect = () => ({
    getStateProps: () => ({ value: '.RefreshFlag' }),
    getActionsApi: () => ({
      updateFieldValue: (_p: string, v: unknown) => setValue(Boolean(v)),
      triggerFieldChange: () => {}
    })
  });
  return (
    <>
      <HanoverEFOLibraryBooleanButton {...args} value={value} getPConnect={getPConnect} />
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
    valueBehavior: 'toggle',
    displayValue: 'Yes/No'
  }
};
/* Disabled: the button is greyed out and clicking it does nothing */
export const Disabled: Story = {
  render: (args: any) => <Demo {...args} />,
  args: {
    ...Default.args,
    disabled: true
  }
};
/* Read-only: shows text using the Display Value setting (value is true here) */
export const ReadOnlyYesNo: Story = {
  render: (args: any) => <Demo {...args} initialValue={true} />,
  args: {
    ...Default.args,
    readOnly: true,
    displayValue: 'Yes/No'
  }
};
export const ReadOnlyTrueFalse: Story = {
  render: (args: any) => <Demo {...args} initialValue={false} />,
  args: {
    ...Default.args,
    readOnly: true,
    displayValue: 'True/False'
  }
};
/* Large value display mode */
export const StackedLargeValue: Story = {
  render: (args: any) => <Demo {...args} initialValue={true} />,
  args: {
    ...Default.args,
    displayMode: 'STACKED_LARGE_VAL'
  }
};
