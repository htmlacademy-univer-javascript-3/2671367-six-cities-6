import { FC } from 'react';

import { useFavoriteOffersByCity } from '../entities/offer/hooks/offerHooks';

import { HeaderContainer } from '../app/widgets/header/headerContainer';
import { OffersList } from '../entities/offer';
import FavoritesEmpty from '../components/favoritesEmpty/favoritesEmpty';

const FavoritesPage: FC = () => {
  const favoriteOffers = useFavoriteOffersByCity();

  return (
    <div className="page">
      <HeaderContainer />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? (
            <FavoritesEmpty />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <OffersList offers={favoriteOffers} />
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;
