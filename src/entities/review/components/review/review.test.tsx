import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ReviewComnponent } from '../..';
import { reviews } from '../../../../mocks/reviews';

const mockReview = reviews[0];

const invalidDateReview = {
  ...mockReview,
  date: 'invalid-date',
};

describe('ReviewComnponent', () => {
  it('renders user name and avatar', () => {
    render(<ReviewComnponent review={mockReview} />);
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();

    const avatar = screen.getByAltText(/reviews avatar/i);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockReview.user.avatarUrl);
    expect((avatar as HTMLImageElement).width).toBe(54);
    expect((avatar as HTMLImageElement).height).toBe(54);
  });

  it('renders comment', () => {
    render(<ReviewComnponent review={mockReview} />);
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });

  it('renders correct rating width', () => {
    render(<ReviewComnponent review={mockReview} />);
    const stars = screen.getByText(/rating/i)
      .previousElementSibling as HTMLElement;
    expect(stars?.style.width).toBe(`${mockReview.rating * 20}%`);
  });

  it('renders formatted date for valid date', () => {
    render(<ReviewComnponent review={mockReview} />);
    const timeEl = screen.getByText(/April 24, 2019/);
    expect(timeEl).toBeInTheDocument();
    expect(timeEl).toHaveAttribute('dateTime', mockReview.date);
  });

  it('renders "Invalid date" for invalid date', () => {
    render(<ReviewComnponent review={invalidDateReview} />);
    expect(screen.getByText(/Invalid date/i)).toBeInTheDocument();
  });
});
