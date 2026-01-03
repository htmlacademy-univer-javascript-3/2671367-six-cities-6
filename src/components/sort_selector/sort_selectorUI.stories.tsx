import type { Meta, StoryObj } from '@storybook/react-vite';
import { SortSelectorUI } from './sort_selectorUI';
import { OFFER_FILTER_OPTIONS } from '../../entities/offer/constant/offer_consts';

const meta: Meta<typeof SortSelectorUI> = {
  title: 'Components/SortSelectorUI',
  component: SortSelectorUI,
};

export default meta;

type Story = StoryObj<typeof SortSelectorUI>;

export const Default: Story = {
  args: {
    value: OFFER_FILTER_OPTIONS[0].value,
    options: OFFER_FILTER_OPTIONS,
    onChange: () => {},
  },
};

export const Selected: Story = {
  args: {
    value: OFFER_FILTER_OPTIONS[2].value,
    options: OFFER_FILTER_OPTIONS,
    onChange: () => {},
  },
};
