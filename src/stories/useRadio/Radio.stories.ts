import { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';

const meta = {
  title: 'hooks/useRadio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {},
};
