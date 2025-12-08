import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServerError } from '../../../interface/interface';
import { ThunkConfig } from '../../../app/providers/store/model/stateInterfaces';
import { CityName } from '../../city/constant/cityConsts';
import { Offer } from '../model/offerTypes';

interface Args {
  id: string;
  city: CityName;
}

export const fetchNearOffersByCity = createAsyncThunk<
  Offer[],
  Args,
  ThunkConfig<ServerError>
>('offer/fetchNearbyOffersByCity', async ({ id, city }, thunkAPI) => {
  const { rejectWithValue, extra } = thunkAPI;
  try {
    const response = await extra.api.get<Offer[]>(`/offers/${id}/nearby`);
    if (!response.data) {
      throw new Error();
    }

    return response.data.filter((c) => c.city.name === city);
  } catch (e) {
    return rejectWithValue(extra.errorHandler(e));
  }
});
