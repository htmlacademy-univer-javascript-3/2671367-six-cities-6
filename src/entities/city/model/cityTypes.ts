import { Location } from '../../location/index';
import { CityName as CityName } from '../constant/cityConsts';

export type City = {
  name: CityName;
  location: Location;
};
