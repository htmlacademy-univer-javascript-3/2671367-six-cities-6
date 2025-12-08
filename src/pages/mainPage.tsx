import { FC, useEffect } from 'react';
import { CitiesList } from '../components/citiesList/citiesList';
import { SortSelector } from '../components/sortSelector/sortSelector';
import { useCityName } from '../entities/city';
import {
  useAvailableOffers,
  fetchOffersByCity,
  OffersList,
} from '../entities/offer';
import { cities } from '../mocks/cities';
import { useSetCity } from '../entities/city/hook/cityHooks';
import { useAppDispatch } from '../shared/hooks/appHooks';
import { CityMap } from '../app/widgets/cityMap';

import { HeaderContainer } from '../app/widgets/header/headerContainer';
import { useOfferSort } from '../entities/offer/hooks/offerHooks';
import { filterOffers } from '../entities/offer/util/filterOffers';

const MainPage: FC = () => {
  const offers = useAvailableOffers();
  const dispatch = useAppDispatch();
  const sort = useOfferSort();
  const sortedOffers = filterOffers(offers, sort);

  const currentCityName = useCityName();
  const currentCity = cities.find((c) => c.name === currentCityName)!;

  const setCity = useSetCity();

  useEffect(() => {
    if (currentCity) {
      dispatch(fetchOffersByCity(currentCity.name));
    }
  }, [currentCity, dispatch]);

  return (
    <div className="page page--gray page--main">
      <HeaderContainer />

      <main className="page__main page__main--index">
        <CitiesList
          cities={cities}
          currentCity={currentCity}
          onClick={(city) => setCity(city.name)}
        />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <b className="places__found">
                {offers.length} places to stay in {currentCityName}
              </b>
              <SortSelector />
              <div className="cities__places-list places__list tabs__content">
                <OffersList offers={sortedOffers} variant="cities" />
              </div>
            </section>

            <div className="cities__right-section">
              <CityMap city={currentCity} offers={sortedOffers} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
