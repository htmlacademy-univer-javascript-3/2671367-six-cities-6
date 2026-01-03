import { createAsyncThunk } from '@reduxjs/toolkit';
import { CityName } from '../../city/constant/city_consts';
import { Offer } from '../model/offer_types';
import { ThunkConfig } from '../../../app/providers/store/model/state_interfaces';
import { ServerError } from '../../../interface/interface';
import { isOfferFilterType, filter_offers } from '../util/filter_offers';

export const fetch_offers_by_city = createAsyncThunk<
  Offer[],
  CityName,
  ThunkConfig<ServerError>
>('offer/fetch_offers_by_city', async (city, thunkAPI) => {
  const { rejectWithValue, extra } = thunkAPI;
  try {
    const response = await extra.api.get<Offer[]>('/offers');
    if (!response.data) {
      throw new Error();
    }

    const params = new URLSearchParams(window.location.search);
    const sortParam = params.get('sort-by');
    const filteredByCity = response.data.filter((c) => c.city.name === city);
    if (sortParam && isOfferFilterType(sortParam)) {
      return filter_offers(filteredByCity, sortParam);
    }
    return filteredByCity;
  } catch (e) {
    return rejectWithValue(extra.errorHandler(e));
  }
});
