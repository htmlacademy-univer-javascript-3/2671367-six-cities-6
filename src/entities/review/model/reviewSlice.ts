import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewState } from './reviewState';
import { createOfferReview, fetchOfferReviews, Review } from '..';

const initialState: ReviewState = {
  reviewsByOfferId: {},
  error: undefined,
  isLoading: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferReviews.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchOfferReviews.fulfilled,
        (
          state,
          action: PayloadAction<{ offerId: string; reviews: Review[] }>
        ) => {
          const { offerId, reviews } = action.payload;
          state.reviewsByOfferId[offerId] = reviews;
          state.isLoading = false;
        }
      )
      .addCase(fetchOfferReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? undefined;
      })
      .addCase(createOfferReview.fulfilled, (state, action) => {
        const { offerId, review } = action.payload;
        if (!state.reviewsByOfferId[offerId]) {
          state.reviewsByOfferId[offerId] = [];
        }
        state.reviewsByOfferId[offerId].push(review);
      });
  },
});

export const reviewReducer = reviewSlice.reducer;
