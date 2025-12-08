import { useSelector } from 'react-redux';
import { getReviewsByOfferId, getReviewsError, getReviewsLoading } from '..';

export const useReviewsByOffer = (offerId?: string) =>
  useSelector(getReviewsByOfferId(offerId));

export const useReviewsLoading = () => useSelector(getReviewsLoading);
export const useReviewsError = () => useSelector(getReviewsError);
