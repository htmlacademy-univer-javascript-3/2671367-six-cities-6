import { CityName } from '../../city/constant/city_consts';
import { OfferFilterType } from '../constant/offer_consts';
import { Offer, OfferDetails } from './offerTypes';

export interface OfferState {
  availableOffers: Offer[];
  nearbyOffers: Offer[];
  offer: OfferDetails | null;
  favoriteOffers: Partial<Record<CityName, Offer[]>>;
  favoriteCount: number;
  filterBy: OfferFilterType;
}
