import { AuthorizationStatus } from '../consts';
import { Offer, Offers } from '../types/offersTypes';

export interface MainPageProps {
  offers: Offers;
}

export interface AuthProps {
  authorizationStatus: AuthorizationStatus;
}

export interface PlaceCardProps {
  offer: Offer;
}

export interface OffersListProps {
  offers: Offers;
}
