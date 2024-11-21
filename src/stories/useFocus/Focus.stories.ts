import { Meta, StoryObj } from '@storybook/react';
import Focus from './Focus';

const meta = {
  title: 'hooks/useFocus',
  component: Focus,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Focus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {},
};
