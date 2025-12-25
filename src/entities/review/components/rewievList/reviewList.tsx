import { FC } from 'react';

import { ReviewComnponent } from '../review/review';
import { CommentForm } from '../../../../components/commentForm/commentForm';
import { ReviewListProps } from '../../../../interface/interface';
import { useAppSelector } from '../../../../shared/hooks/appHooks';
import { getAuthorizationStatus } from '../../../../entities/user/model/userSelector';
import { AuthorizationStatus } from '../../../../consts';

interface ReviewListWithOfferIdProps extends ReviewListProps {
  offerId: string;
}

export const ReviewList: FC<ReviewListWithOfferIdProps> = ({
  reviews,
  offerId,
}) => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewComnponent key={review.id} review={review} />
        ))}
      </ul>
      {isAuth && <CommentForm offerId={offerId} />}
    </section>
  );
};
