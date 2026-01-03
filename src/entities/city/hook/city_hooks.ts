import { cityActions, CityName } from '..';
import { useAppDispatch } from '../../../shared/hooks/appHooks';

export const useSetCity = () => {
  const dispatch = useAppDispatch();
  return (name: CityName) => dispatch(cityActions.setCity(name));
};
