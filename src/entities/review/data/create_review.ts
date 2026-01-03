import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../app/providers/store';
import { Review } from '../model/review_types';
import { ServerError } from '../../../interface/interface';

export const createOfferReview = createAsyncThunk<
  { offerId: string; review: Review },
  { offerId: string; rating: number; comment: string },
  ThunkConfig<ServerError>
>('offer/create_review', async ({ offerId, rating, comment }, thunkAPI) => {
  const { rejectWithValue, extra } = thunkAPI;
  try {
    const response = await extra.api.post<Review>(`/comments/${offerId}`, {
      rating,
      comment,
    });
    if (!response.data) {
      throw new Error('Could not create review');
    }
    return { offerId, review: response.data };
  } catch (e) {
    return rejectWithValue(extra.errorHandler(e));
  }
});
