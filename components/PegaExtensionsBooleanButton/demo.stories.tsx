import { useState } from 'react';
import type { StoryObj } from '@storybook/react';
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

const Demo = (args: any) => {
  const [value, setValue] = useState<boolean>(false);
  const getPConnect = () => ({
    getStateProps: () => ({ value: '.RefreshFlag' }),
    getActionsApi: () => ({
      updateFieldValue: (_p: string, v: boolean) => setValue(v),
      triggerFieldChange: () => {}
    })
  });
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
