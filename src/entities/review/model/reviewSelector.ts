import { StateSchema } from '../../../app/providers/store';

export const getReviewsByOfferId = (offerId?: string) => (state: StateSchema) =>
  offerId ? state.review.reviewsByOfferId[offerId] ?? [] : [];

export const getReviewsLoading = (state: StateSchema) => state.review.isLoading;
export const getReviewsError = (state: StateSchema) => state.review.error;
