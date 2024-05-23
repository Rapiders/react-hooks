import { Meta, StoryObj } from '@storybook/react';
import Debounce from './Debounce';

const meta = {
  title: 'hooks/useDebounce',
  component: Debounce,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Debounce>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {
    time: 500,
  },
};
