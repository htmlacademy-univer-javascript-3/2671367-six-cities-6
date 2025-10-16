import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../consts';
import MainPage from '../pages/mainPage';
import LoginPage from '../pages/loginPage';
import FavoritesPage from '../pages/favoritesPage';
import OfferPage from '../pages/offerPage';
import NotFoundPage from '../pages/notFoundPage';
import { AppProps } from '../interface/interface';
import ProtectRoute from '../components/protectRoute';

export default function RoutRoot({ offers, reviews, nearOffers }: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          element={
            <ProtectRoute authorizationStatus={AuthorizationStatus.Auth} />
          }
        >
          <Route path={AppRoute.Root} element={<MainPage offers={offers} />} />
          <Route
            path={AppRoute.Favorites}
            element={<FavoritesPage offers={offers} />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage reviews={reviews} nearOffers={nearOffers} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
