import { ServerError } from '../../../interface/interface';
import { Review } from './reviewTypes';

export interface ReviewState {
  reviewsByOfferId: Record<string, Review[]>;
  error?: ServerError;
  isLoading: boolean;
}
