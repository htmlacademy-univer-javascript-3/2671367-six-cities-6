import { CityName } from '../../city/constant/city-consts';
import { OfferFilterType } from '../constant/offer-consts';
import { Offer, OfferDetails } from './offer-types';

export interface OfferState {
  availableOffers: Offer[];
  nearbyOffers: Offer[];
  offer: OfferDetails | null;
  favoriteOffers: Partial<Record<CityName, Offer[]>>;
  favoriteCount: number;
  filterBy: OfferFilterType;
}
