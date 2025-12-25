import { UserAuthData } from '..';
import { AuthorizationStatus } from '../../../consts';
import { ServerError } from '../../../interface/interface';

export interface UserState {
  user?: UserAuthData;
  authStatus: AuthorizationStatus;
  authError?: ServerError;
}
