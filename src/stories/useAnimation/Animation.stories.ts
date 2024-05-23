import type { Meta, StoryObj } from '@storybook/react';
import { Animation } from './Animation';
import { hideStyle, showStyle } from './Animation.css';

const meta = {
  title: 'hooks/useAnimation',
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
    mountClassName: showStyle,
    unmountClassName: hideStyle,
  },
};

export const nonAnimation: Story = {
  args: {},
};
