export type { OfferType, Offer, OfferDetails } from './model/offer_types';

export { offerReducer } from './model/offer_slice';
export type { OfferState } from './model/offer_state';

export {
  getAvailableOffers,
  getOffer,
  getNearbyOffers,
} from './model/offer_selector';

export {
  useAvailableOffers,
  useNearOffers as useNearbyOffers,
  useOffer,
  useFavoriteOffers,
  useFavoriteCount,
} from './usecases/offerUsecases';

export { fetch_offers_by_city } from './data/fetch_offers_by_city';
export { fetchNearOffersByCity } from './data/fetch_near_offers';
export { fetchOfferDetalies } from './data/fetch_offer_detailes';
export { fetch_favorite_offers } from './data/fetch_favorite_offers';
export { toggle_favorite_offer } from './data/toggle_favorite_offer';

export { OFFER_FILTER_OPTIONS } from './constant/offer_consts.ts';

export { OfferCard } from './components/offer_card/offer_card.tsx';
export { OffersList } from './components/offers_list/offers_list.tsx';
export { OfferDetailsUI } from './components/offer_details/offer_details.tsx';
