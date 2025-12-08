import { memo, ReactNode, useMemo } from 'react';
import cn from 'classnames';
import { OfferDetails } from '../../index';

interface OfferDetailsProps {
  offer: OfferDetails;
  reviews: ReactNode;
}

const OfferDetailsComponent = ({ offer, reviews }: OfferDetailsProps) => {
  const starsWidth = useMemo(() => offer.rating * 20, [offer.rating]);

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer.images.map((src) => (
            <div className="offer__image-wrapper" key={src}>
              <img className="offer__image" src={src} alt="Offer view" />
            </div>
          ))}
        </div>
      </div>

      <div className="offer__container container">
        <div className="offer__wrapper">
          {offer.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}

          <div className="offer__name-wrapper">
            <h1 className="offer__name">{offer.title}</h1>

            <button
              className={cn('offer__bookmark-button button', {
                'offer__bookmark-button--active': offer.isFavorite,
              })}
              type="button"
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>

          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${starsWidth}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">
              {offer.rating}
            </span>
          </div>

          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {offer.type}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {offer.bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {offer.maxAdults} adults
            </li>
          </ul>

          <div className="offer__price">
            <b className="offer__price-value">&euro;{offer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>

          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {offer.goods.map((g) => (
                <li className="offer__inside-item" key={g}>
                  {g}
                </li>
              ))}
            </ul>
          </div>

          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>

            <div className="offer__host-user user">
              <div
                className={cn('offer__avatar-wrapper', 'user__avatar-wrapper', {
                  'offer__avatar-wrapper--pro': offer.host.isPro,
                })}
              >
                <img
                  className="offer__avatar user__avatar"
                  src={offer.host.avatarUrl}
                  width={74}
                  height={74}
                  alt={offer.host.name}
                />
              </div>

              <span className="offer__user-name">{offer.host.name}</span>
              {offer.host.isPro && (
                <span className="offer__user-status">Pro</span>
              )}
            </div>

            <div className="offer__description">
              <p className="offer__text">{offer.description}</p>
            </div>
          </div>

          {reviews}
        </div>
      </div>
    </section>
  );
};

export const OfferDetailsUI = memo(OfferDetailsComponent);
