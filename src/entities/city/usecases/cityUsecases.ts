import { useSelector } from 'react-redux';
import { getCityName } from '../model/citySelector';

export function useCityName() {
  return useSelector(getCityName);
}
