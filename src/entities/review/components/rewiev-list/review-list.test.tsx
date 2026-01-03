import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { AuthorizationStatus } from '../../../../consts';
import { reviews } from '../../../../mocks/reviews';

import { mockedUseAppSelector } from '../../../../setup-tests';
import { ReviewList } from '../..';

vi.mock('../review/review', () => ({
  ReviewComnponent: ({ review }: { review: { id: string } }) => (
    <li data-testid="review-item">{review.id}</li>
  ),
}));

vi.mock('../../../../components/comment_form/comment_form', () => ({
  CommentForm: ({ offerId }: { offerId: string }) => (
    <div data-testid="comment-form">{offerId}</div>
  ),
}));

describe('ReviewList', () => {
  const offerId = 'offer-123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders reviews count', () => {
    mockedUseAppSelector.mockReturnValue(AuthorizationStatus.NoAuth);

    render(<ReviewList reviews={reviews} offerId={offerId} />);

    const title = screen.getByRole('heading', { name: /reviews/i });
    expect(title).toHaveTextContent(reviews.length.toString());
  });

  it('renders list of reviews', () => {
    mockedUseAppSelector.mockReturnValue(AuthorizationStatus.NoAuth);

    render(<ReviewList reviews={reviews} offerId={offerId} />);

    const items = screen.getAllByTestId('review-item');
    expect(items).toHaveLength(reviews.length);
  });

  it('does NOT render CommentForm when user is not authorized', () => {
    mockedUseAppSelector.mockReturnValue(AuthorizationStatus.NoAuth);

    render(<ReviewList reviews={reviews} offerId={offerId} />);

    expect(screen.queryByTestId('comment-form')).not.toBeInTheDocument();
  });

  it('renders CommentForm when user is authorized', () => {
    mockedUseAppSelector.mockReturnValue(AuthorizationStatus.Auth);

    render(<ReviewList reviews={reviews} offerId={offerId} />);

    const form = screen.getByTestId('comment-form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveTextContent(offerId);
  });
});
