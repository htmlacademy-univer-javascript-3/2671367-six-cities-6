import { useAppSelector } from '../../../shared/hooks/appHooks';
import { Header } from './header';

export function HeaderContainer() {
  const user = useAppSelector((state) => state.user.user);

  const email = user?.email ?? 'Oliver.conner@gmail.com';
  const isAuth = true; //Boolean(user)

  const favoriteCount = 3;

  return (
    <Header
      email={email ?? undefined}
      favoriteCount={favoriteCount}
      isAuth={isAuth}
    />
  );
}
