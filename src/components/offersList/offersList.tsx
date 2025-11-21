import { FC } from 'react';
import { OffersListProps, VariantProps } from '../../interface/interface';
import PlaceCard from '../placeCard/placeCard';

interface ExtendedOffersListProps extends OffersListProps, VariantProps {}

const OffersList: FC<ExtendedOffersListProps> = ({
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
        <PlaceCard key={offer.id} offer={offer} variant={variant} />
      ))}
    </div>
  );
};

export default OffersList;
