import { City } from '../../city/model/city_types';
import { User } from '../../user/model/userTypes';
import { Location } from '../../location/model/location_types';

export type OfferType = 'Apartment' | 'Private room' | 'House' | 'Hotel';

export interface Offer {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
}

export interface OfferDetails extends Offer {
  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: User;
  description: string;
}
