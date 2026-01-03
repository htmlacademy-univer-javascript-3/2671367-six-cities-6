import { cityActions, CityName } from '..';
import { useAppDispatch } from '../../../shared/hooks/app-hooks';

export const useSetCity = () => {
  const dispatch = useAppDispatch();
  return (name: CityName) => dispatch(cityActions.setCity(name));
};
