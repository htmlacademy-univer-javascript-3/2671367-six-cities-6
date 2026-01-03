export type { OfferType, Offer, OfferDetails } from './model/offerTypes';

export { offerReducer } from './model/offerSlice';
export type { OfferState } from './model/offerState';

export {
  getAvailableOffers,
  getOffer,
  getNearbyOffers,
} from './model/offerSelector';

export {
  useAvailableOffers,
  useNearOffers as useNearbyOffers,
  useOffer,
  useFavoriteOffers,
  useFavoriteCount,
} from './usecases/offerUsecases';

export { fetchOffersByCity } from './data/fetchOffersByCity';
export { fetchNearOffersByCity } from './data/fetchNearOffers';
export { fetchOfferDetalies } from './data/fetchOfferDetailes';
export { fetchFavoriteOffers } from './data/fetchFavoriteOffers';
export { toggleFavoriteOffer } from './data/toggleFavoriteOffer';

export { OFFER_FILTER_OPTIONS } from './constant/offer_consts.ts';

export { OfferCard } from './components/offer_card/offer_card.tsx';
export { OffersList } from './components/offers_list/offers_list.tsx';
export { OfferDetailsUI } from './components/offer_details/offer_details.tsx';
