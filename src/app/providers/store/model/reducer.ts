import { ReducersMapObject } from '@reduxjs/toolkit';
import { cityReducer } from '../../../../entities/city/model/city_slice';
import { StateSchema } from './state_interfaces';
import { offerReducer } from '../../../../entities/offer/model/offer_slice';
import { userReducer } from '../../../../entities/user/model/userSlice';
import { reviewReducer } from '../../../../entities/review';

export const reducers: ReducersMapObject<StateSchema> = {
  city: cityReducer,
  offer: offerReducer,
  user: userReducer,
  review: reviewReducer,
};
