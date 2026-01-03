import { useSelector } from 'react-redux';
import { getCityName } from '../model/city-selector';

export function useCityName() {
  return useSelector(getCityName);
}
