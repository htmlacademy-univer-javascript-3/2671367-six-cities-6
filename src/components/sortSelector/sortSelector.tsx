import { SortSelectorUI } from './sortSelectorUI';
import { OFFER_FILTER_OPTIONS } from '../../entities/offer/constant/offerConsts';
import {
  useOfferSort,
  useSetOfferSort,
} from '../../entities/offer/hooks/offerHooks';
import { isOfferFilterType } from '../../entities/offer/util/filterOffers';

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
