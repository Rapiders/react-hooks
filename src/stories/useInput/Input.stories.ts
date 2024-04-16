import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'hooks/useInput',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {};
