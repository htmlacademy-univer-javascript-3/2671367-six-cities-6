import type { Meta, StoryObj } from '@storybook/react';

import { offers } from '../../../../mocks/offers';
import { ExtendedPlaceCardProps, OfferCard } from './offerCard';

const meta: Meta<typeof OfferCard> = {
  title: 'Components/PlaceCard',
  component: OfferCard,
};

export default meta;

type Story = StoryObj<typeof OfferCard>;

const mockOffer: ExtendedPlaceCardProps['offer'] = offers[1];

export const Default: Story = {
  args: {
    offer: { ...mockOffer, isFavorite: false },
    variant: 'cities',
  },
};

export const FavoriteActive: Story = {
  args: {
    offer: { ...mockOffer, isFavorite: true },
    variant: 'cities',
  },
};

export const PremiumOffer: Story = {
  args: {
    offer: { ...mockOffer, isPremium: true },
    variant: 'cities',
  },
};
