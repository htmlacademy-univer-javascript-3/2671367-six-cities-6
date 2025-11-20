import { City } from './cityTypes';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: Host;
  description: string;
  city: City;
  location: location;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type location = {
  lat: number;
  lng: number;
};

export type Offers = Offer[];
