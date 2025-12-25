import { useAppSelector } from '../../../shared/hooks/appHooks';
import { Header } from './header';
import { getAuthorizationStatus } from '../../../entities/user/model/userSelector';
import { AuthorizationStatus } from '../../../consts';
import { useAppDispatch } from '../../../shared/hooks/appHooks';
import { logout } from '../../../entities/user/data/logoutUser';
import { useFavoriteOffersByCity } from '../../../entities/offer/hooks/offerHooks';

export function HeaderContainer() {
  const user = useAppSelector((state) => state.user.user);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const favoriteOffers = useFavoriteOffersByCity();

  const isAuth = authStatus === AuthorizationStatus.Auth;
  const email = user?.email;
  const favoriteCount = favoriteOffers.length;

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
