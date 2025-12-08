import type { Meta, StoryObj } from '@storybook/react';
import { ReviewComnponent } from './review';
import { ReviewProps } from '../../interface/interface';

const meta: Meta<typeof ReviewComnponent> = {
  title: 'Components/Review',
  component: ReviewComnponent,
};

export default meta;

type Story = StoryObj<typeof ReviewComnponent>;

const mockReview: ReviewProps['review'] = {
  id: '1',
  user: {
    name: 'Max',
    avatarUrl: 'https://i.pravatar.cc/54?img=3',
  },
  rating: 4,
  comment: 'Great apartment, very clean and well located.',
  date: '2023-05-15T10:00:00.000Z',
};

export const Default: Story = {
  args: {
    review: mockReview,
  },
};
