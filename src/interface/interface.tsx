import { AuthorizationStatus } from '../consts';
import { City, Offer, Offers } from '../types/offersTypes';
import { Review, Reviews } from '../types/reviewTypes';

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
  offers: Offers;
  selectedOfferId?: string;
  className?: string;
}

export interface ReviewProps {
  review: Review;
}

export interface ReviewListProps {
  reviews: Reviews;
}

export interface OffersPageProps {
  reviews: Reviews;
  nearOffers: Offers;
}

export interface AppProps {
  offers: Offers;
  nearOffers: Offers;
  reviews: Reviews;
}

export interface VariantProps {
  variant?: 'cities' | 'near-places';
}
