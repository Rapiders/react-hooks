import { Meta, StoryObj } from '@storybook/react';
import TimerDragCarousel from './TimerDragCarousel';

const meta = {
  title: 'hooks/useDragCarousel',
  component: TimerDragCarousel,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof TimerDragCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const timerStory: Story = {};
