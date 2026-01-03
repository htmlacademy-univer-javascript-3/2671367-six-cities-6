import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../model/offer_types';
import { ThunkConfig } from '../../../app/providers/store/model/state_interfaces';
import { ServerError } from '../../../interface/interface';
import { CityName } from '../../city/constant/city_consts';

export const fetch_favorite_offers = createAsyncThunk<
  Partial<Record<CityName, Offer[]>>,
  void,
  ThunkConfig<ServerError>
>('offer/fetch_favorite_offers', async (_, thunkAPI) => {
  const { rejectWithValue, extra } = thunkAPI;
  try {
    const response = await extra.api.get<Offer[]>('/favorite');
    if (!response.data) {
      throw new Error();
    }

    return response.data.reduce(
      (acc: Partial<Record<CityName, Offer[]>>, curr) => {
        if (!(curr.city.name in acc)) {
          acc[curr.city.name] = [];
        }
        acc[curr.city.name]!.push(curr);

        return acc;
      },
      {}
    );
  } catch (e) {
    return rejectWithValue(extra.errorHandler(e));
  }
});
