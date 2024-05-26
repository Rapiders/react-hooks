import { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta = {
  title: 'hooks/useSwitch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {};
