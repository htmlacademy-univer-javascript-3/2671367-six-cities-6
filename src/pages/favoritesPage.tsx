import { FC, useEffect } from 'react';

import { useFavoriteOffersByCity } from '../entities/offer/hooks/offerHooks';

import { HeaderContainer } from '../app/widgets/header/headerContainer';
import { fetchOffersByCity, OffersList } from '../entities/offer';
import FavoritesEmpty from '../components/favoritesEmpty/favoritesEmpty';
import { useCityName } from '../entities/city';
import { useSetCity } from '../entities/city/hook/cityHooks';
import { cities } from '../mocks/cities';
import { CitiesList } from '../components/citiesList/citiesList';
import { useAppDispatch } from '../shared/hooks/appHooks';

const FavoritesPage: FC = () => {
  const currentCityName = useCityName();
  const currentCity = cities.find((c) => c.name === currentCityName)!;

  const favoriteOffers = useFavoriteOffersByCity(currentCity.name);
  const dispatch = useAppDispatch();
  const setCity = useSetCity();

  useEffect(() => {
    if (currentCity) {
      dispatch(fetchOffersByCity(currentCity.name));
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
          {favoriteOffers.length === 0 ? (
            <FavoritesEmpty />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <OffersList offers={favoriteOffers} />
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
