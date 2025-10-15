import { FC } from 'react';
import { ReviewListProps } from '../interface/interrface';
import { Review } from './review';

export const ReviewList: FC<ReviewListProps> = ({ reviews }) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  </section>
);
