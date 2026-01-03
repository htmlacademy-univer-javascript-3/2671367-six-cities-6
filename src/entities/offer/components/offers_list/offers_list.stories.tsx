import type { Meta, StoryObj } from '@storybook/react-vite';

import { offers } from '../../../../mocks/offers';
import { OffersList } from './offers_list';

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
  parameters: {
    store: {
      initialState: { user: { authStatus: 'NO_AUTH' } },
    },
  },
};

export const NearPlacesVariant: Story = {
  args: {
    offers: offers,
    variant: 'near-places',
  },
  parameters: {
    store: {
      initialState: { user: { authStatus: 'NO_AUTH' } },
    },
  },
};
