import React, { useState, useCallback } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { RatingTitle } from '../../consts';
import { useAppDispatch } from '../../shared/hooks/app-hooks';
import { createOfferReview } from '../../entities/review';
import { useAppSelector } from '../../shared/hooks/app-hooks';
import {
  getReviewsError,
  getReviewsLoading,
} from '../../entities/review/model/review-selector';

const RATING_VALUES = [5, 4, 3, 2, 1];

const getRatingTitle = (star: number): RatingTitle => {
  switch (star) {
    case 5:
      return RatingTitle.Perfect;
    case 4:
      return RatingTitle.Good;
    case 3:
      return RatingTitle.NotBad;
    case 2:
      return RatingTitle.Badly;
    default:
      return RatingTitle.Terribly;
  }
};

interface CommentFormProps {
  offerId: string;
}

export const CommentForm: FC<CommentFormProps> = ({ offerId }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getReviewsLoading);
  const error = useAppSelector(getReviewsError);

  const handleRatingChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setRating(Number(e.target.value)),
    []
  );

  const handleCommentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value),
    []
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setValidationError(null);
      // don't block UI (button is active), show validation feedback if invalid
      if (rating === null || comment.length < 50) {
        setValidationError(
          'Please set a rating and write at least 50 characters.'
        );
        return;
      }

      setIsSubmitting(true);
      // safety timeout to avoid permanently disabled UI (10s)
      const timeout = setTimeout(() => setIsSubmitting(false), 10000);

      dispatch(
        createOfferReview({
          offerId,
          rating,
          comment,
        })
      ).then((result) => {
        clearTimeout(timeout);
        setIsSubmitting(false);
        // Clear form only on success
        if (createOfferReview.fulfilled.match(result)) {
          setRating(null);
          setComment('');
        }
      });
    },
    [dispatch, offerId, rating, comment]
  );

  // Button is active by default; it becomes disabled only during submit/load
  const isDisabled = isLoading || isSubmitting;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      {error && (
        <div
          className="reviews__error"
          style={{ color: 'red', marginBottom: '10px' }}
        >
          {error.message || 'Failed to submit review. Please try again.'}
        </div>
      )}

      {validationError && (
        <div
          className="reviews__error"
          style={{ color: 'red', marginBottom: '10px' }}
        >
          {validationError}
        </div>
      )}

      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`rating-${star}`}
              type="radio"
              checked={rating === star}
              onChange={handleRatingChange}
              disabled={isDisabled}
            />
            <label
              htmlFor={`rating-${star}`}
              className="reviews__rating-label form__rating-label"
              title={getRatingTitle(star)}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isDisabled}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          {isLoading || isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
