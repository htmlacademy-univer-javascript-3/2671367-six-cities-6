import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferDetails } from '../model/offerTypes';
import { ThunkConfig } from '../../../app/providers/store/model/stateInterfaces';
import { ServerError } from '../../../interface/interface';

interface Args {
  id: string;
  status: 0 | 1;
}

export const toggleFavoriteOffer = createAsyncThunk<
  OfferDetails,
  Args,
  ThunkConfig<ServerError>
>('offer/toggleFavoriteOffer', async ({ id, status }, thunkAPI) => {
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
