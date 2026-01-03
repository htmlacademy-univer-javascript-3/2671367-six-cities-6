import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, waitFor } from '@testing-library/react';

import { CommentForm } from './comment_form';
import { renderWithProviders } from '../../tests/renderWithProviders';
import * as appHooks from '../../shared/hooks/appHooks';
import { createOfferReview } from '../../entities/review';
import { mockedUseAppDispatch, mockedUseAppSelector } from '../../setupTests';

beforeEach(() => vi.clearAllMocks());

describe('CommentForm', () => {
  it('shows validation error when rating is not set or comment too short', () => {
    mockedUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(undefined);

    const { getByText } = renderWithProviders(<CommentForm offerId="1" />);

    fireEvent.click(getByText('Submit'));

    expect(
      getByText('Please set a rating and write at least 50 characters.')
    ).toBeInTheDocument();
  });

  it('disables controls when loading', () => {
    mockedUseAppSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(undefined);

    const { getByRole } = renderWithProviders(<CommentForm offerId="1" />);

    expect(getByRole('button')).toBeDisabled();
  });

  it('dispatches createOfferReview and clears form on fulfilled', async () => {
    mockedUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(undefined);

    const dispatchMock = vi.fn(() =>
      Promise.resolve({ type: createOfferReview.fulfilled.type })
    );
    mockedUseAppDispatch.mockReturnValue(
      dispatchMock as unknown as ReturnType<typeof appHooks.useAppDispatch>
    );

    const spyMatch = vi
      .spyOn(createOfferReview.fulfilled, 'match')
      .mockImplementation((payload: unknown) => {
        const action = payload as { type?: string } | undefined;
        return action?.type === createOfferReview.fulfilled.type;
      });

    const { getAllByRole, getByLabelText, getByText } = renderWithProviders(
      <CommentForm offerId="1" />
    );

    const radios = getAllByRole('radio');
    fireEvent.click(radios[0]);

    const textarea = getByLabelText('Your review') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'a'.repeat(60) } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalled();
      expect(textarea.value).toBe('');
    });

    spyMatch.mockRestore();
  });
});
