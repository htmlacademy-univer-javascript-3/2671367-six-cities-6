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
  city: string;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offers = Offer[];
