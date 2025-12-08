import { useSelector } from 'react-redux';
import {
  getAvailableOffers,
  getFavoriteCount,
  getFavoriteOffers,
  getNearbyOffers,
  getOffer,
} from '../model/offerSelector';

export function useAvailableOffers() {
  return useSelector(getAvailableOffers);
}
export function useNearOffers() {
  return useSelector(getNearbyOffers);
}
export function useOffer() {
  return useSelector(getOffer);
}

export function useFavoriteOffers() {
  return useSelector(getFavoriteOffers);
}
export function useFavoriteCount() {
  return useSelector(getFavoriteCount);
}
