import { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';

const meta = {
  title: 'hooks/useCarousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {};
