import { AxiosInstance } from 'axios';
import { ServerError } from '../../../../interface/interface';

import { CityState } from '../../../../entities/city';
import { OfferState } from '../../../../entities/offer';
import { UserState } from '../../../../entities/user/model/user-state';
import { ReviewState } from '../../../../entities/review';

export interface StateSchema {
  city: CityState;
  offer: OfferState;
  user: UserState;
  review: ReviewState;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  errorHandler: (err: unknown) => ServerError;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
