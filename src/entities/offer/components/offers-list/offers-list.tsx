import { FC } from 'react';

import { OffersListProps, VariantProps } from '../../../../interface/interface';
import { OfferCard } from '../..';

interface ExtendedOffersListProps extends OffersListProps, VariantProps {
  onOfferHover?: (offerId: string | null) => void;
}

export const OffersList: FC<ExtendedOffersListProps> = ({
  offers,
  variant = 'cities',
  onOfferHover,
}) => {
  const containerClass =
    variant === 'cities'
      ? 'cities__places-list places__list tabs__content'
      : 'near-places__list places__list';

  return (
    <div className={containerClass}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={onOfferHover ? () => onOfferHover(offer.id) : undefined}
          onMouseLeave={onOfferHover ? () => onOfferHover(null) : undefined}
        />
      ))}
    </div>
  );
};
