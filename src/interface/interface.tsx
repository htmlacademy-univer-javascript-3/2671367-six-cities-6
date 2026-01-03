import { AuthorizationStatus } from '../consts';
import { City } from '../entities/city/model/city_types';
import { ERROR_TYPE } from '../types/errorTypes';
import { Offer } from '../entities/offer/model/offer_types';
import { Review } from '../entities/review/model/review_types';
import { Location } from '../entities/location/index';

export interface AuthProps {
  authorizationStatus: AuthorizationStatus;
}

export interface PlaceCardProps {
  offer: Offer;
}

export interface OffersListProps {
  offers: Offer[];
}

export interface MapProps {
  location: Location;
  offers: Offer[];
  selectedOfferId?: string;
  className?: string;
}

export interface ReviewProps {
  review: Review;
}

export interface ReviewListProps {
  reviews: Review[];
}
export interface VariantProps {
  variant?: 'cities' | 'near-places' | 'favorites';
}

export interface CitiesListProps {
  cities: City[];
  currentCity: City;
  onClick: (city: City) => void;
}

interface ServerErrorDetail {
  property: string;
  value: string;
  messages: string[];
}

export interface ServerError {
  errorType: ERROR_TYPE;
  message: string;
  details: ServerErrorDetail[];
}
