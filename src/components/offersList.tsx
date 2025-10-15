import { FC } from 'react';
import { OffersListProps } from '../interface/interface';
import PlaceCard from './placeCard';

const OffersList: FC<OffersListProps> = ({ offers }) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} />
    ))}
  </div>
);

export default OffersList;
