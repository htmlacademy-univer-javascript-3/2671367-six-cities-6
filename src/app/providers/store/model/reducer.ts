import { ReducersMapObject } from '@reduxjs/toolkit';
import { cityReducer } from '../../../../entities/city/model/city-slice';
import { StateSchema } from './state-interfaces';
import { offerReducer } from '../../../../entities/offer/model/offer-slice';
import { userReducer } from '../../../../entities/user/model/user-slice';
import { reviewReducer } from '../../../../entities/review';

export const reducers: ReducersMapObject<StateSchema> = {
  city: cityReducer,
  offer: offerReducer,
  user: userReducer,
  review: reviewReducer,
};
