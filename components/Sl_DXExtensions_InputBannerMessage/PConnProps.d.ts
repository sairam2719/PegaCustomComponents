import type { StoryObj } from '@storybook/react-webpack5';
import { SlDxExtensionsInputBannerMessage } from './index';

export default {
  title: 'Fields/Banner Input',
  component: SlDxExtensionsInputBannerMessage,
};

type Story = StoryObj<typeof SlDxExtensionsInputBannerMessage>;

export const Default: Story = {
  args: {
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'success',
    icon: 'warn-solid',
  },
};