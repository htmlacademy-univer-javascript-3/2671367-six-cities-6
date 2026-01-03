import { memo, useMemo } from 'react';
import Map from '../../../components/map/map';
import { Offer } from '../../../entities/offer';
import { City, CITY_LOCATIONS, CityName } from '../../../entities/city';
import { FALLBACK_CITY } from '../../../entities/city/constant/city_consts';
import { Location } from '../../../entities/location/index';

interface CityMapProps {
  city: City | CityName | null;
  offers: Offer[];
  selectedOfferId?: string;
}

export const CityMap = memo(
  ({ city, offers, selectedOfferId }: CityMapProps) => {
    const location: Location = useMemo(() => {
      if (city && typeof city === 'object' && 'location' in city) {
        return city.location;
      }
      if (typeof city === 'string' && CITY_LOCATIONS[city]) {
        return CITY_LOCATIONS[city];
      }
      return CITY_LOCATIONS[FALLBACK_CITY];
    }, [city]);

    return (
      <Map
        location={location}
        offers={offers}
        selectedOfferId={selectedOfferId}
        className="cities__map map"
      />
    );
  }
);

CityMap.displayName = 'CityMap';
