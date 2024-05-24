import { Meta, StoryObj } from '@storybook/react';
import Throttle from './Throttle';

const meta = {
  title: 'hooks/useThrottle',
  component: Throttle,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Throttle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {
    time: 500,
  },
};
