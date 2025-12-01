import { SortSelectorUI } from './sortSelectorUI';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { changeSort } from '../../store/action';

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popular-desc' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Top rated first', value: 'top-desc' },
];

export const SortSelector = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValue = searchParams.get('sort-by') || SORT_OPTIONS[0].value;

  const handleChange = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('sort-by', value);
      return newParams;
    });
    dispatch(changeSort(value));
  };

  return (
    <SortSelectorUI
      value={selectedValue}
      options={SORT_OPTIONS}
      onChange={handleChange}
    />
  );
};
