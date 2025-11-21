import type { Meta, StoryObj } from '@storybook/react';

import PlaceCard, { ExtendedPlaceCardProps } from './placeCard';
import { offers } from '../../mocks/offers';

const meta: Meta<typeof PlaceCard> = {
  title: 'Components/PlaceCard',
  component: PlaceCard,
};

export default meta;

type Story = StoryObj<typeof PlaceCard>;

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
