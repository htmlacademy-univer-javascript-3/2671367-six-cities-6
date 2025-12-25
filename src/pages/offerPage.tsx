import { FC, useEffect } from 'react';

import {
  useNearOffers,
  useOffer,
} from '../entities/offer/usecases/offerUsecases';
import { CityMap } from '../app/widgets/cityMap';

import { HeaderContainer } from '../app/widgets/header/headerContainer';
import { OfferDetailsUI } from '../entities/offer/components/offerDetails/offerDetails';
import { useParams } from 'react-router-dom';
import {
  fetchNearOffersByCity,
  fetchOfferDetalies,
  OffersList,
} from '../entities/offer';
import { useAppDispatch } from '../shared/hooks/appHooks';
import { fetchOfferReviews, ReviewList } from '../entities/review';
import { useReviewsByOffer } from '../entities/review/usecases/reviewUsecases';

const OfferPage: FC = () => {
  const offer = useOffer();
  const nearOffers = useNearOffers();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const reviews = useReviewsByOffer(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferDetalies(id));
      dispatch(fetchOfferReviews(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (offer) {
      dispatch(
        fetchNearOffersByCity({
          id: offer.id,
          city: offer.city.name,
        })
      );
    }
  }, [dispatch, offer]);

  if (!offer) {
    return null;
  }

  return (
    <div className="page">
      <HeaderContainer />
      <main className="page__main page__main--offer">
        <OfferDetailsUI
          offer={offer}
          reviews={<ReviewList reviews={reviews} offerId={offer.id} />}
        />
        <section className="offer__map map">
          <CityMap
            city={offer.city}
            offers={[offer, ...nearOffers.slice(0, 5)]}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList offers={nearOffers.slice(0, 5)} variant="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
