import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offersTypes';
import { City } from '../types/cityTypes';

export const changeCity = createAction<City>('city/changeCity');
export const fillOffers = createAction<Offers>('offers/fillOffers');
export const initData = createAction('app/initData');
