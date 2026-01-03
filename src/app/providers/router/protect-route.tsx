import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../../consts';
import { getAuthorizationStatus } from '../../../entities/user/model/user-selector';
import { Loader } from '../../widgets/loader/loader';

const ProtectRoute: FC = () => {
  const authStatus = useSelector(getAuthorizationStatus);

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Loader fullscreen />;
  }

  return authStatus === AuthorizationStatus.Auth ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoute.Login} replace />
  );
};

export default ProtectRoute;
