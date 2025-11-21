import type { Meta, StoryObj } from '@storybook/react';
import { Review } from './review';
import { ReviewProps } from '../../interface/interface';

const meta: Meta<typeof Review> = {
  title: 'Components/Review',
  component: Review,
};

export default meta;

type Story = StoryObj<typeof Review>;

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
