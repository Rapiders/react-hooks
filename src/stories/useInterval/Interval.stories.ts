import { Meta, StoryObj } from '@storybook/react';
import Interval from './Interval';

const meta = {
  title: 'hooks/useInterval',
  component: Interval,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Interval>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {
    time: 1000,
  },
};
