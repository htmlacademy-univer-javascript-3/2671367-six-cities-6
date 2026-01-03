import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { CommentForm } from './comment-form';
const meta: Meta<typeof CommentForm> = {
  title: 'Components/CommentForm',
  component: CommentForm,
};

export default meta;
type Story = StoryObj<typeof CommentForm>;

export const Default: Story = {
  parameters: {
    store: {
      initialState: {
        review: { isLoading: false, error: undefined },
        user: { authStatus: 'AUTH' },
      },
    },
  },
};

const CommentFormWrapper = () => {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState(
    'This is a sample comment for preview purposes. '.repeat(2)
  );

  return (
    <form className="reviews__form form">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`rating-${star}`}
              type="radio"
              checked={rating === star}
              onChange={() => setRating(star)}
            />
            <label
              htmlFor={`rating-${star}`}
              className="reviews__rating-label form__rating-label"
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
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="reviews__button-wrapper">
        <button
          className="reviews__submit form__submit button"
          type="button"
          disabled={!(rating && comment.length >= 50)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export const Filled: Story = {
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <CommentFormWrapper />
    </div>
  ),
};
