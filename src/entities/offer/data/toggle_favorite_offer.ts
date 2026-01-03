import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferDetails } from '../model/offer_types';
import { ThunkConfig } from '../../../app/providers/store/model/state_interfaces';
import { ServerError } from '../../../interface/interface';

interface Args {
  id: string;
  status: 0 | 1;
}

export const toggle_favorite_offer = createAsyncThunk<
  OfferDetails,
  Args,
  ThunkConfig<ServerError>
>('offer/toggle_favorite_offer', async ({ id, status }, thunkAPI) => {
  const { rejectWithValue, extra } = thunkAPI;
  try {
    const response = await extra.api.post<OfferDetails>(
      `/favorite/${id}/${status}`
    );
    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue(extra.errorHandler(e));
  }
});
