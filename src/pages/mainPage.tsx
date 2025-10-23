import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCity } from '../store/action';
import {
  selectOffers,
  selectCities,
  selectCurrentCity,
} from '../store/selectors';
import OffersList from '../components/offersList';
import Map from '../components/map';
import { CitiesList } from '../components/citiesList';
import { City } from '../types/cityTypes';

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const offers = useSelector(selectOffers);
  const cities = useSelector(selectCities);
  const currentCity = useSelector(selectCurrentCity);

  const handleCityChange = (city: City) => {
    dispatch(changeCity(city));
  };

  const filteredOffers = offers.filter(
    (offer) => offer.city.name === currentCity.name
  );

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <CitiesList
          cities={cities}
          currentCity={currentCity}
          onClick={handleCityChange}
        />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <b className="places__found">
                {filteredOffers.length} places to stay in {currentCity.name}
              </b>

              <div className="cities__places-list places__list tabs__content">
                <OffersList offers={filteredOffers} variant="cities" />
              </div>
            </section>

            <div className="cities__right-section">
              <Map
                city={currentCity}
                offers={filteredOffers}
                className="cities__map map"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
