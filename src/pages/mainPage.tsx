import { FC, useEffect, useState } from 'react';
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
import CitiesNoPlaces from '../components/citiesNoPlaces/citiesNoPlaces';

import { HeaderContainer } from '../app/widgets/header/headerContainer';
import { useOfferSort } from '../entities/offer/hooks/offerHooks';
import { filterOffers } from '../entities/offer/util/filterOffers';

const MainPage: FC = () => {
  const offers = useAvailableOffers();
  const dispatch = useAppDispatch();
  const sort = useOfferSort();
  const sortedOffers = filterOffers(offers, sort);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const currentCityName = useCityName();
  const currentCity = cities.find((c) => c.name === currentCityName)!;

  const setCity = useSetCity();

  useEffect(() => {
    if (currentCity) {
      dispatch(fetchOffersByCity(currentCity.name));
    }
  }, [currentCity, dispatch]);

  const handleOfferHover = (offerId: string | null) => {
    setSelectedOfferId(offerId);
  };

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
          {offers.length === 0 ? (
            <div className="cities__places-container cities__places-container--empty container">
              <CitiesNoPlaces cityName={currentCityName} />
              <div className="cities__right-section" />
            </div>
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <b className="places__found">
                  {offers.length} places to stay in {currentCityName}
                </b>
                <SortSelector />
                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    offers={sortedOffers}
                    variant="cities"
                    onOfferHover={handleOfferHover}
                  />
                </div>
              </section>

              <div className="cities__right-section">
                <CityMap
                  city={currentCity}
                  offers={sortedOffers}
                  selectedOfferId={selectedOfferId ?? undefined}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
