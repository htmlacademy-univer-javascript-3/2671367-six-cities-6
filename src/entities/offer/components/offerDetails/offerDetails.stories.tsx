import type { Meta, StoryObj } from '@storybook/react-vite';
import { OfferDetailsUI } from './offerDetails';
import { offers } from '../../../../mocks/offers';

const meta: Meta<typeof OfferDetailsUI> = {
  title: 'Offer/OfferDetails',
  component: OfferDetailsUI,
};

export default meta;

type Story = StoryObj<typeof OfferDetailsUI>;

export const Default: Story = {
  args: {
    offer: offers[0],
    reviews: <div>Reviews placeholder</div>,
  },
};

export const Favorite: Story = {
  args: {
    offer: { ...offers[0], isFavorite: true },
    reviews: <div>Reviews placeholder</div>,
  },
};
