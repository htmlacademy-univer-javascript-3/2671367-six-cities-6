import { useSelector } from 'react-redux';
import { getCityName } from '../model/city_selector';

export function useCityName() {
  return useSelector(getCityName);
}
