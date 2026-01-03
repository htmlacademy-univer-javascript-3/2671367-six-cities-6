import { useAppSelector } from '../../../shared/hooks/app-hooks';
import { Header } from './header';
import { getAuthorizationStatus } from '../../../entities/user/model/user-selector';
import { AuthorizationStatus } from '../../../consts';
import { useAppDispatch } from '../../../shared/hooks/app-hooks';
import { logout } from '../../../entities/user/data/logout-user';
import { useFavoriteOffersByCity } from '../../../entities/offer/hooks/offer-hooks';
import { fetchFavoriteOffers } from '../../../entities/offer';
import { useEffect } from 'react';

export function HeaderContainer() {
  const user = useAppSelector((state) => state.user.user);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const favoriteOffers = useFavoriteOffersByCity();

  const isAuth = authStatus === AuthorizationStatus.Auth;
  const email = user?.email;

  const favoriteCount = isAuth ? favoriteOffers.length : 0;

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, isAuth]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Header
      email={email}
      favoriteCount={favoriteCount}
      isAuth={isAuth}
      onLogout={handleLogout}
    />
  );
}
