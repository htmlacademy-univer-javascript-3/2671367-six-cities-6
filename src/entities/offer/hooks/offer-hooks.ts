import { useSelector, useDispatch } from 'react-redux';

import { offerActions } from '../model/offer-slice';
import { OfferFilterType } from '../constant/offer-consts';

import { StateSchema } from '../../../app/providers/store';
import { Offer, OfferState } from '..';
import { CityName } from '../../city';

export const useOfferSort = (): OfferFilterType =>
  useSelector((state: StateSchema) => state.offer.filterBy);

export const useSetOfferSort = (): ((sort: OfferFilterType) => void) => {
  const dispatch = useDispatch();
  return (sort: OfferFilterType) => {
    dispatch(offerActions.setSort(sort));
  };
};

export const useFavoriteOffersByCity = (city?: CityName): Offer[] => {
  const favoriteOffers = useSelector(
    (state: { offer: OfferState }) => state.offer.favorite_offers
  );

  if (city) {
    return favoriteOffers[city] ?? [];
  }

  return Object.values(favoriteOffers).filter(Boolean).flat();
};
