
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { configProps, stateProps } from './mock';

import HanoverEfoLibraryDisplayToggle from './index';

const meta: Meta<typeof HanoverEfoLibraryDisplayToggle> = {
  title: 'HanoverEfoLibraryDisplayToggle',
  component: HanoverEfoLibraryDisplayToggle,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof HanoverEfoLibraryDisplayToggle>;

export const BaseHanoverEfoLibraryDisplayToggle: Story = (args: any) => {

  const [value, setValue] = useState(configProps.value);

  const props = {
    value,
    additionalProps: configProps.additionalProps,
    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: (propName: string, theValue: any) => {
              setValue(theValue);
            },
            triggerFieldChange: () => { /* nothing */}
          };
        },
        getValidationApi: () => {
          return {
            validate: () => { /* nothing */}
          };
        }
      };
    }
  };

  return (
    <>
      <HanoverEfoLibraryDisplayToggle {...props} {...args} />
    </>
  );
};

BaseHanoverEfoLibraryDisplayToggle.args = {
  label: configProps.label,
  helperText: configProps.helperText,
  caption: configProps.caption,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  hideLabel: configProps.hideLabel,
  trueLabel: configProps.trueLabel,
  falseLabel: configProps.falseLabel,
  displayMode: configProps.displayMode,
  variant: configProps.variant,
  validatemessage: configProps.validatemessage
};
