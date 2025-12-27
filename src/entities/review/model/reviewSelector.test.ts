import { describe, it, expect } from 'vitest';
import { getReviewsByOfferId, getReviewsLoading, getReviewsError } from '..';
import { StateSchema } from '../../../app/providers/store';

describe('review selectors', () => {
  const mockState: StateSchema = {
    review: {
      reviewsByOfferId: {
        '1': [{ id: 'r1', text: 'Great!', rating: 5 }],
        '2': [{ id: 'r2', text: 'Not bad', rating: 4 }],
      },
      isLoading: false,
      error: null,
    },
  } as unknown as StateSchema;

  it('getReviewsByOfferId returns reviews for a valid offerId', () => {
    const selector = getReviewsByOfferId('1');
    expect(selector(mockState)).toEqual([
      { id: 'r1', text: 'Great!', rating: 5 },
    ]);
  });

  it('getReviewsByOfferId returns empty array for unknown offerId', () => {
    const selector = getReviewsByOfferId('unknown');
    expect(selector(mockState)).toEqual([]);
  });

  it('getReviewsByOfferId returns empty array when offerId is undefined', () => {
    const selector = getReviewsByOfferId();
    expect(selector(mockState)).toEqual([]);
  });

  it('getReviewsLoading returns loading state', () => {
    expect(getReviewsLoading(mockState)).toBe(false);
  });

  it('getReviewsError returns error state', () => {
    expect(getReviewsError(mockState)).toBeNull();
  });
});
