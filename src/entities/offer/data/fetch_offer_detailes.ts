import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../app/providers/store/model/state_interfaces';
import { OfferDetails } from '../model/offer_types';
import { ServerError } from '../../../interface/interface';

export const fetchOfferDetalies = createAsyncThunk<
  OfferDetails,
  string,
  ThunkConfig<ServerError>
>('offer/fetchOffer', async (offerId, thunkAPI) => {
  const { rejectWithValue, extra } = thunkAPI;
  try {
    const response = await extra.api.get<OfferDetails>(`/offers/${offerId}`);
    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue(extra.errorHandler(e));
  }
});
