import type { Meta, StoryObj } from '@storybook/react';

import OffersList from './offersList';
import { offers } from '../../../../mocks/offers';

const meta: Meta<typeof OffersList> = {
  title: 'Components/OffersList',
  component: OffersList,
};

export default meta;

type Story = StoryObj<typeof OffersList>;

export const CitiesVariant: Story = {
  args: {
    offers: offers,
    variant: 'cities',
  },
};

export const NearPlacesVariant: Story = {
  args: {
    offers: offers,
    variant: 'near-places',
  },
};
