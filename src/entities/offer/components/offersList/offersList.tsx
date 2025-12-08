import { FC } from 'react';

import { OffersListProps, VariantProps } from '../../../../interface/interface';
import { OfferCard } from '../..';

interface ExtendedOffersListProps extends OffersListProps, VariantProps {}

export const OffersList: FC<ExtendedOffersListProps> = ({
  offers,
  variant = 'cities',
}) => {
  const containerClass =
    variant === 'cities'
      ? 'cities__places-list places__list tabs__content'
      : 'near-places__list places__list';

  return (
    <div className={containerClass}>
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} variant={variant} />
      ))}
    </div>
  );
};
