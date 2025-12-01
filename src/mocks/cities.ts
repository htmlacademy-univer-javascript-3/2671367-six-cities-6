import { City } from '../models/city/types/cityTypes';
import { Location } from '../models/location/types/locationTypes';

const locations: Location[] = [
  { lat: 48.864716, lng: 2.349014 },
  { lat: 50.935173, lng: 6.953101 },
  { lat: 50.85045, lng: 4.34878 },
  { lat: 52.377956, lng: 4.89707 },
  { lat: 53.551086, lng: 9.993682 },
  { lat: 51.233334, lng: 6.783333 },
];

export const cities: City[] = [
  { name: 'Paris', location: locations[0] },
  { name: 'Cologne', location: locations[1] },
  { name: 'Brussels', location: locations[2] },
  { name: 'Amsterdam', location: locations[3] },
  { name: 'Hamburg', location: locations[4] },
  { name: 'Dusseldorf', location: locations[5] },
];
