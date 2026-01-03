import type { Meta, StoryObj } from '@storybook/react-vite';
import { FavoritesEmpty } from './favorites-empty';

const meta: Meta<typeof FavoritesEmpty> = {
  title: 'Components/FavoritesEmpty',
  component: FavoritesEmpty,
};

export default meta;

type Story = StoryObj<typeof FavoritesEmpty>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    message: 'You haven`t saved anything yet',
    description: 'Add favorites to see them here',
  },
};
