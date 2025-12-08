import { City } from '../../city/model/cityTypes';
import { User } from '../../user/model/userTypes';
import { Location } from '../../location/model/locationTypes';

export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

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
