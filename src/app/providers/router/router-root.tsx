import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ProtectRoute from './protect-route';
import { AppRoute } from '../../../consts';
import { lazy, Suspense } from 'react';
import { Loader } from '../../widgets/loader/loader';

const MainPage = lazy(() => import('../../../pages/main-page'));
const LoginPage = lazy(() => import('../../../pages/login-page'));
const FavoritesPage = lazy(() => import('../../../pages/favorites-page'));
const OfferPage = lazy(() => import('../../../pages/offer-page'));
const NotFoundPage = lazy(() => import('../../../pages/not-found-page'));

function withSuspense(element: JSX.Element) {
  return <Suspense fallback={<Loader fullscreen />}>{element}</Suspense>;
}

export default function RoutRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Login} element={withSuspense(<LoginPage />)} />

        {/* Public routes - accessible to all users */}
        <Route path={AppRoute.Root} element={withSuspense(<MainPage />)} />
        <Route path={AppRoute.Offer} element={withSuspense(<OfferPage />)} />

        {/* Protected route - only for authorized users */}
        <Route element={<ProtectRoute />}>
          <Route
            path={AppRoute.Favorites}
            element={withSuspense(<FavoritesPage />)}
          />
        </Route>

        <Route path="*" element={withSuspense(<NotFoundPage />)} />
      </Routes>
    </BrowserRouter>
  );
}
