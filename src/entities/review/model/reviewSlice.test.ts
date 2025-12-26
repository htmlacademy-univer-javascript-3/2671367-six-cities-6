import { reviewReducer } from './reviewSlice';
import { fetchOfferReviews } from '../data/fetchReview';
import { createOfferReview } from '../data/createReview';
import type { ReviewState } from './reviewState';
import { reviews } from '../../../mocks/reviews';

const initial: ReviewState | undefined = undefined;

describe('review reducer', () => {
  it('should set loading on fetchOfferReviews.pending', () => {
    const next = reviewReducer(undefined, fetchOfferReviews.pending('', '1'));
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeUndefined();
  });

  it('should set reviews on fetchOfferReviews.fulfilled', () => {
    const payload = { offerId: '1', reviews: reviews };
    const next = reviewReducer(
      initial,
      fetchOfferReviews.fulfilled(payload, '', '1')
    );
    expect(next.reviewsByOfferId['1']).toEqual(payload.reviews);
    expect(next.isLoading).toBe(false);
  });

  it('should add review on createOfferReview.fulfilled', () => {
    const payload = { offerId: '1', review: reviews[0] };
    const next = reviewReducer(
      initial,
      createOfferReview.fulfilled(payload, '', {
        offerId: '1',
        rating: 5,
        comment: 'ok',
      } as unknown as { offerId: string; rating: number; comment: string })
    );
    expect(next.reviewsByOfferId['1']).toEqual([payload.review]);
    expect(next.isLoading).toBe(false);
  });
});
