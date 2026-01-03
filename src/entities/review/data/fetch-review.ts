import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '..';
import { ThunkConfig } from '../../../app/providers/store';
import { ServerError } from '../../../interface/interface';

export const fetchOfferReviews = createAsyncThunk<
  { offerId: string; reviews: Review[] },
  string,
  ThunkConfig<ServerError>
>('offer/fetchReviews', async (offerId, thunkAPI) => {
  const { rejectWithValue, extra } = thunkAPI;
  try {
    const response = await extra.api.get<Review[]>(`/comments/${offerId}`);
    if (!response.data) {
      throw new Error('Could not fetch reviews');
    }
    const reviews = response.data;
    return { offerId, reviews };
  } catch (e) {
    return rejectWithValue({
      errorType: 'UNEXPECTED_ERROR',
      message: (e as Error).message,
      details: [],
    });
  }
});
