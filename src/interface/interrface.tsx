import { AuthorizationStatus } from '../consts';
import { City, Offer, Offers } from '../types/offersTypes';

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

export interface MapProps {
  city: City;
  offers: Offer[];
  selectedOfferId?: string;
  className?: string;
}
