import { FC, useEffect, useState } from 'react';
import { CitiesList } from '../components/cities_list/cities_ist';
import { SortSelector } from '../components/sort_selector/sort_selector';
import { useCityName } from '../entities/city';
import {
  useAvailableOffers,
  fetch_offers_by_city,
  OffersList,
} from '../entities/offer';
import { cities } from '../mocks/cities';
import { useSetCity } from '../entities/city/hook/city_hooks';
import { useAppDispatch } from '../shared/hooks/appHooks';
import { CityMap } from '../app/widgets/city_map/city_map';
import CitiesNoPlaces from '../components/cities_no_places/cities_no_places';

import { HeaderContainer } from '../app/widgets/header/header_container';
import { useOfferSort } from '../entities/offer/hooks/offer_hooks';
import { filter_offers } from '../entities/offer/util/filter_offers';

const MainPage: FC = () => {
  const offers = useAvailableOffers();
  const dispatch = useAppDispatch();
  const sort = useOfferSort();
  const sortedOffers = filter_offers(offers, sort);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const currentCityName = useCityName();
  const currentCity = cities.find((c) => c.name === currentCityName)!;

  const setCity = useSetCity();

  useEffect(() => {
    if (currentCity) {
      dispatch(fetch_offers_by_city(currentCity.name));
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
