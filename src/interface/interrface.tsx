import { AuthorizationStatus } from '../consts';

export interface MainPageProps {
  offerCount: number;
}

export interface AuthProps {
  authorizationStatus: AuthorizationStatus;
}
