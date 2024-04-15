import { Meta, StoryObj } from '@storybook/react';
import DragCarousel from './DragCarousel';

const meta = {
  title: 'hooks/useDragCarousel',
  component: DragCarousel,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof DragCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {};
