import { useAppSelector } from '../../../shared/hooks/appHooks';
import { Header } from './header';
import { getAuthorizationStatus } from '../../../entities/user/model/userSelector';
import { AuthorizationStatus } from '../../../consts';
import { useAppDispatch } from '../../../shared/hooks/appHooks';
import { logout } from '../../../entities/user/data/logoutUser';
import { useFavoriteOffersByCity } from '../../../entities/offer/hooks/offer_hooks';
import { fetch_favorite_offers } from '../../../entities/offer';
import { useEffect } from 'react';

export function HeaderContainer() {
  const user = useAppSelector((state) => state.user.user);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const favorite_offers = useFavoriteOffersByCity();

  const isAuth = authStatus === AuthorizationStatus.Auth;
  const email = user?.email;

  const favoriteCount = isAuth ? favorite_offers.length : 0;

  useEffect(() => {
    if (isAuth) {
      dispatch(fetch_favorite_offers());
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
