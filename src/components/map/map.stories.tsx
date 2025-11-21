import type { Meta, StoryObj } from '@storybook/react';
import Map from './map';

import 'leaflet/dist/leaflet.css';
import { cities } from '../../mocks/cities';
import { MapProps } from '../../interface/interface';
import { offers } from '../../mocks/offers';

const style = {
  width: '600px',
  height: '400px',
  border: '1px solid #ccc',
};

const meta: Meta<typeof Map> = {
  title: 'Components/Map',
  component: Map,
  decorators: [
    (Story) => (
      <div style={style}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Map>;

const mockOffers: MapProps['offers'] = offers;

export const Default: Story = {
  args: {
    city: cities[0],
    offers: mockOffers,
    selectedOfferId: undefined,
    className: 'map',
  },
};

export const MapWithMarks: Story = {
  args: {
    city: cities[3],
    offers: mockOffers,
    selectedOfferId: undefined,
    className: 'map',
  },
};
