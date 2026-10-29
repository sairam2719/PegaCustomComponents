import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { configProps, stateProps } from './mock';
import HanoverEFOLibraryBooleanButton from './index';

const meta: Meta<typeof HanoverEFOLibraryBooleanButton> = {
  title: 'HanoverEFOLibraryBooleanButton',
  component: HanoverEFOLibraryBooleanButton,
  excludeStories: /.*Data$/,
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
    value: { table: { disable: true } },
    getPConnect: { table: { disable: true } },
    testId: { table: { disable: true } },
    displayMode: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<typeof HanoverEFOLibraryBooleanButton>;

const Demo = (args: any) => {
  const [value, setValue] = useState<boolean>(configProps.value);

  const getPConnect = () => ({
    getStateProps: () => stateProps,
    getActionsApi: () => ({
      updateFieldValue: (_p: string, v: boolean) => setValue(v),
      triggerFieldChange: () => {
        /* nothing */
      }
    }),
    getValidationApi: () => ({
      validate: () => {
        /* nothing */
      }
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
    label: configProps.label,
    buttonLabel: configProps.buttonLabel,
    helperText: configProps.helperText,
    testId: configProps.testId,
    hideLabel: configProps.hideLabel,
    variant: 'primary',
    alignment: 'left',
    icon: 'none',
    fullWidth: false,
    valueBehavior: 'toggle',
    disabled: false
  }
};

// Disabled by the custom condition: button is faded/blurred and click does nothing
export const Disabled: Story = {
  render: (args: any) => <Demo {...args} />,
  args: {
    ...Default.args,
    disabled: true
  }
};
