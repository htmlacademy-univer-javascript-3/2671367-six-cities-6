import { CityName } from '../../city/constant/city_consts';
import { Offer } from '../model/offer_types';

export function toggleFavoriteOffers(offers: Offer[], id: string) {
  return offers.map((offer) => {
    if (offer.id === id) {
      return { ...offer, isFavorite: !offer.isFavorite };
    }
    return offer;
  });
}

export function calculateFavoritesCount(
  offers: Partial<Record<CityName, Offer[]>>
) {
  return Object.values(offers).reduce((acc, offs) => {
    acc = acc + offs.length;
    return acc;
  }, 0);
}
