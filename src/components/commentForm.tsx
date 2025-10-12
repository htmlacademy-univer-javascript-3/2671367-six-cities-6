import React, { useState, useCallback } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { RatingTitle } from '../consts';

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

export const CommentForm: FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleRatingChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setRating(Number(e.target.value)),
    []
  );

  const handleCommentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value),
    []
  );

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    // send logic
    setRating(null);
    setComment('');
  }, []);

  const isFormValid = rating !== null && comment.length >= 50;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

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
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
