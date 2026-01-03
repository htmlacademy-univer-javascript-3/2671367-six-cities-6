import { CityName } from '../../city/constant/city_consts';
import { OfferFilterType } from '../constant/offer_consts';
import { Offer, OfferDetails } from './offer_types';

export interface OfferState {
  availableOffers: Offer[];
  nearbyOffers: Offer[];
  offer: OfferDetails | null;
  favorite_offers: Partial<Record<CityName, Offer[]>>;
  favoriteCount: number;
  filterBy: OfferFilterType;
}
