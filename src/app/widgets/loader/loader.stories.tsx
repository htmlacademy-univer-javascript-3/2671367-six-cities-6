import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from './loader';

const meta: Meta<typeof Loader> = {
  title: 'Widgets/Loader',
  component: Loader,
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 24 },
};

export const Fullscreen: Story = {
  args: { fullscreen: true },
};
