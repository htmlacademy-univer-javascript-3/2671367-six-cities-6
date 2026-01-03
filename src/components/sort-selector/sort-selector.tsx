import { SortSelectorUI } from './sort-selector-ui';
import { OFFER_FILTER_OPTIONS } from '../../entities/offer/constant/offer-consts';
import {
  useOfferSort,
  useSetOfferSort,
} from '../../entities/offer/hooks/offer-hooks';
import { isOfferFilterType } from '../../entities/offer/util/filter-offers';

export const SortSelector = () => {
  const currentSort = useOfferSort();
  const setSort = useSetOfferSort();

  const handleChange = (value: string) => {
    if (isOfferFilterType(value)) {
      setSort(value);
    }
  };

  return (
    <SortSelectorUI
      value={currentSort}
      options={OFFER_FILTER_OPTIONS}
      onChange={handleChange}
    />
  );
};
