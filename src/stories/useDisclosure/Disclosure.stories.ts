import { Meta, StoryObj } from '@storybook/react';
import UseDisclosureExample from './UseDisclosureExample';

const meta = {
  title: 'hooks/useDisclosure',
  component: UseDisclosureExample,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {},
    },
  },
} satisfies Meta<typeof UseDisclosureExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {};
