import type { Meta, StoryObj } from '@storybook/react';
import { CitiesList } from './cities-list';
import { CitiesListProps } from '../../interface/interface';
import { cities } from '../../mocks/cities';

const meta: Meta<typeof CitiesList> = {
  title: 'Components/CitiesList',
  component: CitiesList,
};

export default meta;

type Story = StoryObj<typeof CitiesList>;

const mockCities: CitiesListProps['cities'] = cities;

export const Default: Story = {
  args: {
    cities: mockCities,
    currentCity: mockCities[0],
    onClick: () => {},
  },
};

export const SelectAmsterdam: Story = {
  args: {
    cities: mockCities,
    currentCity: mockCities[2],
    onClick: () => {},
  },
};
