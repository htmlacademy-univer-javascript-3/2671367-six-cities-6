import { FC } from 'react';

import { ReviewComnponent } from '../review/review';
import { CommentForm } from '../../../../components/commentForm/commentForm';
import { ReviewListProps } from '../../../../interface/interface';

export const ReviewList: FC<ReviewListProps> = ({ reviews }) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewComnponent key={review.id} review={review} />
      ))}
    </ul>
    <CommentForm />
  </section>
);
