import { State } from '../types/stateTypes';

export const selectOffers = (state: State) => state.offers;
export const selectNearOffers = (state: State) => state.nearOffers;
export const selectCities = (state: State) => state.cities;
export const selectReviews = (state: State) => state.reviews;
export const selectCurrentCity = (state: State) => state.city;
