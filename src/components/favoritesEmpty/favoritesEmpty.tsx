import { FC } from 'react';

interface FavoritesEmptyProps {
  message?: string;
  description?: string;
}

export const FavoritesEmpty: FC<FavoritesEmptyProps> = ({
  message = 'Nothing yet saved.',
  description = 'Save properties to narrow down search or plan your future trips.',
}) => (
  <section className="favorites favorites--empty">
    <h1 className="visually-hidden">Favorites (empty)</h1>
    <div className="favorites__status-wrapper">
      <b className="favorites__status">{message}</b>
      <p className="favorites__status-description">{description}</p>
    </div>
  </section>
);

export default FavoritesEmpty;
