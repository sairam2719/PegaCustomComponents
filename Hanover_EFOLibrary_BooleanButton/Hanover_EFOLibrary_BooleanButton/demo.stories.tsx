import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormField, Input } from '@pega/cosmos-react-core';

import PegaExtensionsBooleanButton, { type BooleanButtonProps } from './index';

const meta: Meta<typeof PegaExtensionsBooleanButton> = {
  title: 'Field/Boolean button',
  component: PegaExtensionsBooleanButton,
  argTypes: {
    label: { control: 'text' },
    buttonLabel: { control: 'text' },
    helperText: { control: 'text' },
    tooltip: { control: 'text' },
    hideLabel: { control: 'boolean' },
    variant: { control: 'select', options: ['primary', 'secondary', 'simple'] },
    alignment: { control: 'select', options: ['left', 'center', 'right'] },
    icon: { control: 'select', options: ['none', 'refresh', 'search', 'check', 'plus'] },
    fullWidth: { control: 'boolean' },
    backgroundColor: { control: 'text' },
    textColor: { control: 'text' },
    borderRadius: { control: 'text' },
    valueBehavior: { control: 'select', options: ['toggle', 'alwaysTrue'] },
    value: { control: 'boolean' },
    disabled: { control: 'boolean', description: 'Standard Pega Disabled (resolved when rule / condition)' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    validatemessage: { control: 'text' },
    displayMode: { control: 'select', options: [undefined, 'DISPLAY_ONLY', 'LABELS_LEFT'] },
    getPConnect: { table: { disable: true } },
    testId: { table: { disable: true } }
  },
  parameters: { layout: 'padded' }
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsBooleanButton>;

/* Demo wrapper: mocks getPConnect, shows the button beside a Quote number field,
   and prints the current property value so toggling is visible. */
const Demo = (args: BooleanButtonProps) => {
  const [value, setValue] = useState<BooleanButtonProps['value']>(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  const getPConnect = () =>
    ({
      getActionsApi: () => ({
        updateFieldValue: (_prop: string, next: boolean) => setValue(next),
        triggerFieldChange: (prop: string, next: boolean) => {
          // eslint-disable-next-line no-console
          console.log('triggerFieldChange', prop, next);
        }
      }),
      getStateProps: () => ({ value: '.RefreshFlag' })
    }) as any;

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 auto', maxWidth: '20rem' }}>
          <FormField label='Quote number'>
            <Input defaultValue='Q-10045' />
          </FormField>
        </div>
        <PegaExtensionsBooleanButton {...args} value={value} getPConnect={getPConnect} />
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
        Property value: <strong>{String(value)}</strong> | Disabled: <strong>{String(args.disabled)}</strong>
      </p>
    </div>
  );
};

const baseArgs: Partial<BooleanButtonProps> = {
  label: 'Search',
  buttonLabel: 'Search',
  hideLabel: true,
  variant: 'primary',
  alignment: 'left',
  icon: 'search',
  valueBehavior: 'toggle',
  value: false,
  disabled: false
};

export const Default: Story = {
  args: baseArgs,
  render: args => <Demo {...(args as BooleanButtonProps)} />
};

/* Simulates the field's Disabled setting (e.g. a when rule) resolving to true */
export const Disabled: Story = {
  args: { ...baseArgs, disabled: true },
  render: args => <Demo {...(args as BooleanButtonProps)} />
};

export const ReadOnlyHidden: Story = {
  args: { ...baseArgs, displayMode: 'DISPLAY_ONLY' },
  render: args => <Demo {...(args as BooleanButtonProps)} />
};

export const AlwaysTrueBehavior: Story = {
  args: { ...baseArgs, valueBehavior: 'alwaysTrue', icon: 'refresh', buttonLabel: 'Refresh' },
  render: args => <Demo {...(args as BooleanButtonProps)} />
};
