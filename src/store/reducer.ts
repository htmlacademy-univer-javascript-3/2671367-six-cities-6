import { createReducer } from '@reduxjs/toolkit';
import { Offers } from '../types/offersTypes';
import { City, Cities } from '../types/cityTypes';
import { changeCity, fillOffers, initData } from './action';
import { offers } from '../mocks/offers';
import { cities } from '../mocks/cities';
import { Reviews } from '../types/reviewTypes';
import { reviews } from '../mocks/reviews';
import { nearOffers } from '../mocks/nearOffers';

type OfferState = {
  city: City;
  offers: Offers;
  reviews: Reviews;
  nearOffers: Offers;
  cities: Cities;
};

const initialState: OfferState = {
  city: cities[0],
  offers: [],
  reviews: [],
  nearOffers: [],
  cities: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(initData, (state) => {
      state.cities = cities;
      state.offers = offers;
      state.nearOffers = nearOffers;
      state.reviews = reviews;
    });
});
