import { FC, useEffect } from 'react';

import { useFavoriteOffersByCity } from '../entities/offer/hooks/offer_hooks';

import { HeaderContainer } from '../app/widgets/header/header_container';
import { fetch_offers_by_city, OffersList } from '../entities/offer';
import FavoritesEmpty from '../components/favorites_empty/favorites_empty';
import { useCityName } from '../entities/city';
import { useSetCity } from '../entities/city/hook/city_hooks';
import { cities } from '../mocks/cities';
import { CitiesList } from '../components/cities_list/cities_ist';
import { useAppDispatch } from '../shared/hooks/appHooks';

const FavoritesPage: FC = () => {
  const currentCityName = useCityName();
  const currentCity = cities.find((c) => c.name === currentCityName)!;

  const favorite_offers = useFavoriteOffersByCity(currentCity.name);
  const dispatch = useAppDispatch();
  const setCity = useSetCity();

  useEffect(() => {
    if (currentCity) {
      dispatch(fetch_offers_by_city(currentCity.name));
    }
  }, [currentCity, dispatch]);

  return (
    <div className="page">
      <HeaderContainer />

      <main className="page__main page__main--favorites">
        <CitiesList
          cities={cities}
          currentCity={currentCity}
          onClick={(city) => setCity(city.name)}
        />

        <div className="page__favorites-container container">
          {favorite_offers.length === 0 ? (
            <FavoritesEmpty />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <OffersList offers={favorite_offers} />
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;
