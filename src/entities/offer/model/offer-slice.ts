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
  favorite_offers: {},
  filterBy: 'popular-desc',
};

const offer_slice = createSlice({
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
        state.favorite_offers = action.payload;
        state.favoriteCount = calculateFavoritesCount(state.favorite_offers);
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
          if (!(offer.city.name in state.favorite_offers)) {
            state.favorite_offers[offer.city.name] = [];
          }
          state.favorite_offers[offer.city.name]!.push(offer);
        }
        if (status === 0) {
          state.favorite_offers[offer.city.name] =
            state.favorite_offers[offer.city.name]?.filter(
              (o) => o.id !== id
            ) ?? [];
        }
        state.nearbyOffers = toggleFavoriteOffers(state.nearbyOffers, id);
        state.availableOffers = toggleFavoriteOffers(state.availableOffers, id);
        state.favoriteCount = calculateFavoritesCount(state.favorite_offers);
        if (state.offer && state.offer.id === id) {
          state.offer.isFavorite = !state.offer.isFavorite;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        // Clear cached favorites and reset related flags on offers when user logs out
        state.favorite_offers = {};
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

export const offerActions = offer_slice.actions;
export const offerReducer = offer_slice.reducer;
