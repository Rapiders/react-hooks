import type { Meta, StoryObj } from '@storybook/react';
import { Animation } from './Animation';

const meta = {
  title: 'useAnimation/animation',
  component: Animation,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Animation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {
    mountClassName: 'show',
    unmountClassName: 'hide',
  },
};

export const nonAnimation: Story = {
  args: {},
};
