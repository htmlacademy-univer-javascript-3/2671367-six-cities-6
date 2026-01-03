import { useSelector, useDispatch } from 'react-redux';

import { offerActions } from '../model/offer_slice';
import { OfferFilterType } from '../constant/offer_consts';

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
  const favorite_offers = useSelector(
    (state: { offer: OfferState }) => state.offer.favorite_offers
  );

  if (city) {
    return favorite_offers[city] ?? [];
  }

  return Object.values(favorite_offers).filter(Boolean).flat();
};
