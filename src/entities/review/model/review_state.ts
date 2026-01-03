import { ServerError } from '../../../interface/interface';
import { Review } from './review_types';

export interface ReviewState {
  reviewsByOfferId: Record<string, Review[]>;
  error?: ServerError;
  isLoading: boolean;
}
