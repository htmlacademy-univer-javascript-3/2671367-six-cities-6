import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewList } from './review-list';
import { ReviewProps } from '../../../../interface/interface';

const meta: Meta<typeof ReviewList> = {
  title: 'Components/ReviewList',
  component: ReviewList,
};

export default meta;

type Story = StoryObj<typeof ReviewList>;

const mockReviews: ReviewProps['review'][] = [
  {
    id: '1',
    comment: 'Great apartment, very clean and well located.',
    date: '2023-05-15T10:00:00.000Z',
    rating: 4,
    user: {
      name: 'Max',
      avatarUrl: 'https://i.pravatar.cc/54?img=3',
      isPro: false,
    },
  },
  {
    id: '2',
    comment: 'Had a pleasant stay, host was responsive.',
    date: '2023-06-01T12:30:00.000Z',
    rating: 5,
    user: {
      name: 'Anna',
      avatarUrl: 'https://i.pravatar.cc/54?img=4',
      isPro: true,
    },
  },
];

export const Default: Story = {
  args: {
    reviews: mockReviews,
  },
  parameters: {
    store: {
      initialState: { user: { authStatus: 'NO_AUTH' } },
    },
  },
};

export const Authenticated: Story = {
  args: {
    reviews: mockReviews,
  },
  parameters: {
    store: {
      initialState: { user: { authStatus: 'AUTH' } },
    },
  },
};
