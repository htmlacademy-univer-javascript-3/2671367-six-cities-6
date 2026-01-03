import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';

import * as redux from 'react-redux';
import {
  useReviewsByOffer,
  useReviewsLoading,
  useReviewsError,
} from './reviewUsecases';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof redux>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

const mockedUseSelector = vi.mocked(redux.useSelector);

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('review usecases', () => {
  it('useReviewsByOffer returns reviews for given offer id', () => {
    const mockVal = [{ id: 'r1' }];
    mockedUseSelector.mockReturnValue(mockVal as never);

    function Test() {
      const val = useReviewsByOffer('offer-1');
      return <div data-testid="val">{JSON.stringify(val)}</div>;
    }

    const { getByTestId } = render(<Test />);

    expect(getByTestId('val').textContent).toBe(JSON.stringify(mockVal));
  });

  it('useReviewsLoading returns loading flag', () => {
    mockedUseSelector.mockReturnValue(true as never);

    function Test() {
      const val = useReviewsLoading();
      return <div data-testid="val">{String(val)}</div>;
    }

    const { getByTestId } = render(<Test />);

    expect(getByTestId('val').textContent).toBe('true');
  });

  it('useReviewsError returns error value', () => {
    mockedUseSelector.mockReturnValue('some error' as never);

    function Test() {
      const val = useReviewsError();
      return <div data-testid="val">{String(val)}</div>;
    }

    const { getByTestId } = render(<Test />);

    expect(getByTestId('val').textContent).toBe('some error');
  });
});
