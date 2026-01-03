export type { OfferType, Offer, OfferDetails } from './model/offer-types.ts';

export { offerReducer } from './model/offer-slice.ts';
export type { OfferState } from './model/offer-state.ts';

export {
  getAvailableOffers,
  getOffer,
  getNearbyOffers,
} from './model/offer-selector.ts';

export {
  useAvailableOffers,
  useNearOffers as useNearbyOffers,
  useOffer,
  useFavoriteOffers,
  useFavoriteCount,
} from './usecases/offer-usecases.ts';

export { fetchOffersByCity } from './data/fetch-offers-by-city.ts';
export { fetchNearOffersByCity } from './data/fetch-near-offers.ts';
export { fetchOfferDetalies } from './data/fetch-offer-detailes.ts';
export { fetchFavoriteOffers } from './data/fetch-favorite-offers.ts';
export { toggleFavoriteOffer } from './data/toggle-favorite-offer.ts';

export { OFFER_FILTER_OPTIONS } from './constant/offer-consts.ts';

export { OfferCard } from './components/offer-card/offer-card.tsx';
export { OffersList } from './components/offers-list/offers-list.tsx';
export { OfferDetailsUI } from './components/offer-details/offer-details.tsx';
