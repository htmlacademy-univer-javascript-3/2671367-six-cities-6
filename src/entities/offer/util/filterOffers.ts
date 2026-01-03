import { OfferFilterType, offerFilterValues } from '../constant/offer_consts';
import { Offer } from '../model/offerTypes';

const sortFunctions: Record<
  OfferFilterType,
  ((a: Offer, b: Offer) => number) | null
> = {
  'popular-desc': null,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'top-desc': (a, b) => b.rating - a.rating,
};

export const filterOffers = (
  offers: Offer[],
  sortType: OfferFilterType
): Offer[] => {
  const sortFn = sortFunctions[sortType];

  if (!sortFn) {
    return [...offers];
  }

  return [...offers].sort(sortFn);
};

export const isOfferFilterType = (str: string): str is OfferFilterType =>
  offerFilterValues.includes(str as OfferFilterType);
