import { AuthorizationStatus } from '../consts';
import { City } from '../models/city/types/cityTypes';
import { ERROR_TYPE } from '../types/errorTypes';
import { Offer } from '../models/offer/types/offerTypes';
import { Review } from '../models/review/types/reviewTypes';

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
  city: City;
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
  variant?: 'cities' | 'near-places';
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
