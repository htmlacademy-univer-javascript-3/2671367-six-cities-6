import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../models/offer/types/offerTypes';
import { City } from '../models/city/types/cityTypes';

export const changeCity = createAction<City>('city/changeCity');
export const fillOffers = createAction<Offer[]>('offers/fillOffers');
export const initData = createAction('app/initData');
export const changeSort = createAction<string>('sort/changeSort');
