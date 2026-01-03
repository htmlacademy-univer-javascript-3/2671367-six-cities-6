import { Location } from '../../location/index';
import { CityName as CityName } from '../constant/city_consts';

export type City = {
  name: CityName;
  location: Location;
};
