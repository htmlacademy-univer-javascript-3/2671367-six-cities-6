import { useDispatch } from 'react-redux';
import { cityActions, CityName } from '..';

export const useSetCity = () => {
  const dispatch = useDispatch();
  return (name: CityName) => dispatch(cityActions.setCity(name));
};
