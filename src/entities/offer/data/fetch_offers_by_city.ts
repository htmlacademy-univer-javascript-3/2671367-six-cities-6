import { createAsyncThunk } from '@reduxjs/toolkit';
import { CityName } from '../../city/constant/city_consts';
import { Offer } from '../model/offerTypes';
import { ThunkConfig } from '../../../app/providers/store/model/stateInterfaces';
import { ServerError } from '../../../interface/interface';
import { isOfferFilterType, filterOffers } from '../util/filterOffers';

export const fetchOffersByCity = createAsyncThunk<
  Offer[],
  CityName,
  ThunkConfig<ServerError>
>('offer/fetchOffersByCity', async (city, thunkAPI) => {
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
      return filterOffers(filteredByCity, sortParam);
    }
    return filteredByCity;
  } catch (e) {
    return rejectWithValue(extra.errorHandler(e));
  }
});
