import { UserAuthData } from '..';
import { ServerError } from '../../../interface/interface';

export interface UserState {
  user?: UserAuthData;
  authError?: ServerError;
}
