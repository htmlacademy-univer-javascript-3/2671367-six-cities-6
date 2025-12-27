import { reviewReducer } from './reviewSlice';
import { fetchOfferReviews } from '../data/fetchReview';
import { createOfferReview } from '../data/createReview';
import type { ReviewState } from './reviewState';
import { reviews } from '../../../mocks/reviews';
import { mockUnexpectedError } from '../../../setupTests';

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

  it('should set error on fetchOfferReviews.rejected', () => {
    const next = reviewReducer(
      initial,
      fetchOfferReviews.rejected(
        new Error('error'),
        '',
        '1',
        mockUnexpectedError
      )
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(mockUnexpectedError);
  });

  it('should set loading on createOfferReview.pending', () => {
    const next = reviewReducer(
      initial,
      createOfferReview.pending('', {
        offerId: '1',
        rating: 5,
        comment: 'ok',
      })
    );

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeUndefined();
  });

  it('should set error on createOfferReview.rejected', () => {
    const next = reviewReducer(
      initial,
      createOfferReview.rejected(
        new Error('error'),
        '',
        { offerId: '1', rating: 5, comment: 'ok' },
        mockUnexpectedError
      )
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(mockUnexpectedError);
  });

  it('should append review if reviews for offer already exist', () => {
    const startState: ReviewState = {
      reviewsByOfferId: {
        '1': [reviews[0]],
      },
      isLoading: false,
      error: undefined,
    };

    const payload = { offerId: '1', review: reviews[1] };

    const next = reviewReducer(
      startState,
      createOfferReview.fulfilled(payload, '', {
        offerId: '1',
        rating: 5,
        comment: 'ok',
      })
    );

    expect(next.reviewsByOfferId['1']).toEqual([reviews[0], reviews[1]]);
  });
});
