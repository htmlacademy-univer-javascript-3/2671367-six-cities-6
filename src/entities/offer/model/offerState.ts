import { CityName } from '../../city/constant/cityConsts';
import { OfferFilterType } from '../constant/offerConsts';
import { Offer, OfferDetails } from './offerTypes';

export interface OfferState {
  availableOffers: Offer[];
  nearbyOffers: Offer[];
  offer: OfferDetails | null;
  favoriteOffers: Partial<Record<CityName, Offer[]>>;
  favoriteCount: number;
  filterBy: OfferFilterType;
}
