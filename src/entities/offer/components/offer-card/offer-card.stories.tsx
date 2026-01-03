import type { Meta, StoryObj } from '@storybook/react-vite';

import { offers } from '../../../../mocks/offers';
import { ExtendedPlaceCardProps, OfferCard } from './offer-card';

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
  parameters: {
    store: { initialState: { user: { authStatus: 'NO_AUTH' } } },
  },
};

export const FavoriteActive: Story = {
  args: {
    offer: { ...mockOffer, isFavorite: true },
    variant: 'cities',
  },
  parameters: {
    store: { initialState: { user: { authStatus: 'AUTH' } } },
  },
};

export const PremiumOffer: Story = {
  args: {
    offer: { ...mockOffer, isPremium: true },
    variant: 'cities',
  },
  parameters: {
    store: { initialState: { user: { authStatus: 'NO_AUTH' } } },
  },
};
