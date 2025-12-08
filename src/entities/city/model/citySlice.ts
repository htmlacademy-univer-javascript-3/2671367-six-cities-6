import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, FALLBACK_CITY } from '../constant/cityConsts';
import { CityState } from './cityState';

const parseCity = (str?: string): CityName | undefined => {
  if (!str) {
    return undefined;
  }

  const match = Object.values(CityName).find(
    (v) => v.toLowerCase() === str.toLowerCase()
  );

  return match;
};

const getCityFromUrl = (): CityName | undefined => {
  const param =
    new URLSearchParams(window.location.search).get('city') ?? undefined;
  return parseCity(param);
};

const initialState: CityState = {
  name: getCityFromUrl() ?? FALLBACK_CITY,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      const parsed = parseCity(action.payload);
      state.name = parsed ?? FALLBACK_CITY;
    },
    resetCity: (state) => {
      state.name = FALLBACK_CITY;
    },
  },
});

export const cityActions = citySlice.actions;
export const cityReducer = citySlice.reducer;
