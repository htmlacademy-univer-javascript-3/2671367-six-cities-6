import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferState } from './offerState';
import { OfferFilterType } from '../constant/offerConsts';
import { fetchOffersByCity } from '../data/fetchOffersByCity';
import { fetchOfferDetalies } from '../data/fetchOfferDetailes';
import { fetchNearOffersByCity } from '../data/fetchNearOffers';
import { toggleFavoriteOffer } from '../data/toggleFavoriteOffer';
import { fetchFavoriteOffers } from '../data/fetchFavoriteOffers';
import {
  calculateFavoritesCount,
  toggleFavoriteOffers,
} from '../util/favoriteOffers';

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
      }),
});

export const offerActions = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
