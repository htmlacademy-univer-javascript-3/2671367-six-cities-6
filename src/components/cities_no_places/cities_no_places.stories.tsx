import type { Meta, StoryObj } from '@storybook/react-vite';
import { CitiesNoPlaces } from './cities_no_places';

const meta: Meta<typeof CitiesNoPlaces> = {
  title: 'Components/CitiesNoPlaces',
  component: CitiesNoPlaces,
};

export default meta;
type Story = StoryObj<typeof CitiesNoPlaces>;

export const Default: Story = {
  args: {
    cityName: 'Paris',
  },
};

export const AnotherCity: Story = {
  args: {
    cityName: 'Dusseldorf',
  },
};
