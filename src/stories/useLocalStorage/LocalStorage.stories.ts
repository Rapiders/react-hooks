import { Meta, StoryObj } from '@storybook/react';
import LocalStorage from './LocalStorage';

const meta = {
  title: 'hooks/useLocalStorage',
  component: LocalStorage,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof LocalStorage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {},
};
