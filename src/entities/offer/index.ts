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

export { OFFER_FILTER_OPTIONS } from './constant/offerConsts';

export { OfferCard } from './components/offerCard/offerCard.tsx';
export { OffersList } from './components/offersList/offersList.tsx';
export { OfferDetailsUI } from './components/offerDetails/offerDetails.tsx';
