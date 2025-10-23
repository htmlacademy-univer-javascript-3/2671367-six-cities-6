import { AuthorizationStatus } from '../consts';
import { Cities, City } from '../types/cityTypes';
import { Offer, Offers } from '../types/offersTypes';
import { Review, Reviews } from '../types/reviewTypes';

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
export interface VariantProps {
  variant?: 'cities' | 'near-places';
}

export interface CitiesListProps {
  cities: Cities;
  currentCity: City;
  onClick: (city: City) => void;
}
