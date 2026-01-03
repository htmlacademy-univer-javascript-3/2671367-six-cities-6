import { Location } from '../../location/model/location_types';

export enum CityName {
  'Paris' = 'Paris',
  'Cologne' = 'Cologne',
  'Brussels' = 'Brussels',
  'Amsterdam' = 'Amsterdam',
  'Hamburg' = 'Hamburg',
  'Dusseldorf' = 'Dusseldorf',
}

export const CITY_LOCATIONS: Record<CityName, Location> = {
  [CityName.Paris]: { latitude: 48.864716, longitude: 2.349014 },
  [CityName.Cologne]: { latitude: 50.935173, longitude: 6.953101 },
  [CityName.Brussels]: { latitude: 50.85045, longitude: 4.34878 },
  [CityName.Amsterdam]: { latitude: 52.377956, longitude: 4.89707 },
  [CityName.Hamburg]: { latitude: 53.551086, longitude: 9.993682 },
  [CityName.Dusseldorf]: { latitude: 51.233334, longitude: 6.783333 },
};

export const FALLBACK_CITY: CityName = CityName.Paris;
