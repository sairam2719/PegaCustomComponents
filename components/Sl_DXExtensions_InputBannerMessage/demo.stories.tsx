
import type { StoryObj } from '@storybook/react';

import { SlDxExtensionsInputBannerMessageProps } from './index';

export default {
  title: 'Fields/Banner Input',
  component: SlDxExtensionsInputBannerMessageProps,
};

type Story = StoryObj<typeof SlDxExtensionsInputBannerMessageProps>;

export const Default: Story = {
  render: (args) => {
    const props = {
      ...args,
    };
    return <SlDxExtensionsInputBannerMessageProps {...props} />;
  },
  args: {
    value:
      'Information saved successfully',
    variant: 'success',
    icon: 'warn-solid',
  },
};