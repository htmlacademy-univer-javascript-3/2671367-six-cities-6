import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../consts';
import { FC } from 'react';
import { AuthProps } from '../interface/interrface';

const ProtectRoute: FC<AuthProps> = ({ authorizationStatus }) =>
  authorizationStatus !== AuthorizationStatus.Auth ? (
    <Navigate to={AppRoute.Login} replace />
  ) : (
    <Outlet />
  );

export default ProtectRoute;
