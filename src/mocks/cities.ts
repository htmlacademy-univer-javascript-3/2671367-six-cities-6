import { CityName } from '../entities/city/constant/city-consts';
import { City } from '../entities/city/model/city-types';
import { Location } from '../entities/location/model/location_types';

const locations: Location[] = [
  { latitude: 48.864716, longitude: 2.349014 },
  { latitude: 50.935173, longitude: 6.953101 },
  { latitude: 50.85045, longitude: 4.34878 },
  { latitude: 52.377956, longitude: 4.89707 },
  { latitude: 53.551086, longitude: 9.993682 },
  { latitude: 51.233334, longitude: 6.783333 },
];

export const cities: City[] = [
  { name: CityName.Paris, location: locations[0] },
  { name: CityName.Cologne, location: locations[1] },
  { name: CityName.Brussels, location: locations[2] },
  { name: CityName.Amsterdam, location: locations[3] },
  { name: CityName.Hamburg, location: locations[4] },
  { name: CityName.Dusseldorf, location: locations[5] },
];
