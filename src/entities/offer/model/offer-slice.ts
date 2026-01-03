import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferState } from './offer-state';
import { OfferFilterType } from '../constant/offer-consts';
import { fetchOffersByCity } from '../data/fetch-offers-by-city';
import { fetchOfferDetalies } from '../data/fetch-offer-detailes';
import { fetchNearOffersByCity } from '../data/fetch-near-offers';
import { toggleFavoriteOffer } from '../data/toggle-favorite-offer';
import { fetchFavoriteOffers } from '../data/fetch-favorite-offers';
import {
  calculateFavoritesCount,
  toggleFavoriteOffers,
} from '../util/favorite-offers';
import { logout } from '../../user/data/logout-user';

const initialState: OfferState = {
  availableOffers: [],
  nearbyOffers: [],
  offer: null,
  favoriteCount: 0,
  favoriteOffers: {},
  filterBy: 'popular-desc',
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<OfferFilterType>) => {
      state.filterBy = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffersByCity.fulfilled, (state, action) => {
        state.availableOffers = action.payload;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.favoriteCount = calculateFavoritesCount(state.favoriteOffers);
      })
      .addCase(fetchOfferDetalies.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(fetchNearOffersByCity.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(toggleFavoriteOffer.fulfilled, (state, action) => {
        const offer = action.payload;
        const status = action.meta.arg.status;
        const id = action.meta.arg.id;
        if (status === 1) {
          if (!(offer.city.name in state.favoriteOffers)) {
            state.favoriteOffers[offer.city.name] = [];
          }
          state.favoriteOffers[offer.city.name]!.push(offer);
        }
        if (status === 0) {
          state.favoriteOffers[offer.city.name] =
            state.favoriteOffers[offer.city.name]?.filter((o) => o.id !== id) ??
            [];
        }
        state.nearbyOffers = toggleFavoriteOffers(state.nearbyOffers, id);
        state.availableOffers = toggleFavoriteOffers(state.availableOffers, id);
        state.favoriteCount = calculateFavoritesCount(state.favoriteOffers);
        if (state.offer && state.offer.id === id) {
          state.offer.isFavorite = !state.offer.isFavorite;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        // Clear cached favorites and reset related flags on offers when user logs out
        state.favoriteOffers = {};
        state.favoriteCount = 0;
        state.availableOffers = state.availableOffers.map((o) => ({
          ...o,
          isFavorite: false,
        }));
        state.nearbyOffers = state.nearbyOffers.map((o) => ({
          ...o,
          isFavorite: false,
        }));
        if (state.offer) {
          state.offer.isFavorite = false;
        }
      }),
});

export const offerActions = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
