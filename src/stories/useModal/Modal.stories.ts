import { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta = {
  title: 'hooks/useModal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {},
};
