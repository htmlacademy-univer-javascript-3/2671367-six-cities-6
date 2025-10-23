import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../consts';
import MainPage from '../pages/mainPage';
import LoginPage from '../pages/loginPage';
import FavoritesPage from '../pages/favoritesPage';
import OfferPage from '../pages/offerPage';
import NotFoundPage from '../pages/notFoundPage';

import ProtectRoute from '../components/protectRoute';

export default function RoutRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          element={
            <ProtectRoute authorizationStatus={AuthorizationStatus.Auth} />
          }
        >
          <Route path={AppRoute.Root} element={<MainPage />} />
          <Route path={AppRoute.Favorites} element={<FavoritesPage />} />
          <Route path={AppRoute.Offer} element={<OfferPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
