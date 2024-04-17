import FocusAnimation from './FocusAnimation';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'hooks/useFocusAnimation',
  component: FocusAnimation,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof FocusAnimation>;
export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {},
};
