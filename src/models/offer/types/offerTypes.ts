import { City } from '../../city/types/cityTypes';
import { User } from '../../user/types/userTypes';
import { Location } from '../../location/types/locationTypes';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: User;
  description: string;
};

export type OfferDetails = {
  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: User;
  description: string;
};
