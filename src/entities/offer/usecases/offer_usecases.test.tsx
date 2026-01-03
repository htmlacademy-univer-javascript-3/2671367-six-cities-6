import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';

import * as redux from 'react-redux';
import {
  useAvailableOffers,
  useNearOffers,
  useOffer,
  useFavoriteOffers,
  useFavoriteCount,
} from './offerUsecases';
import * as selectors from '../model/offerSelector';

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

describe('offer usecases', () => {
  it('useAvailableOffers returns selector value and calls selector', () => {
    const mockVal = [{ id: '1' }];
    mockedUseSelector.mockReturnValue(mockVal as never);

    function Test() {
      const val = useAvailableOffers();
      return <div data-testid="val">{JSON.stringify(val)}</div>;
    }

    const { getByTestId } = render(<Test />);

    expect(getByTestId('val').textContent).toBe(JSON.stringify(mockVal));
    expect(mockedUseSelector).toHaveBeenCalledWith(
      selectors.getAvailableOffers
    );
  });

  it('useNearOffers returns selector value', () => {
    const mockVal = [{ id: 'n1' }];
    mockedUseSelector.mockReturnValue(mockVal as never);

    function Test() {
      const val = useNearOffers();
      return <div data-testid="val">{JSON.stringify(val)}</div>;
    }

    const { getByTestId } = render(<Test />);

    expect(getByTestId('val').textContent).toBe(JSON.stringify(mockVal));
    expect(mockedUseSelector).toHaveBeenCalledWith(selectors.getNearbyOffers);
  });

  it('useOffer returns selector value', () => {
    const mockVal = { id: 'o1' };
    mockedUseSelector.mockReturnValue(mockVal as never);

    function Test() {
      const val = useOffer();
      return <div data-testid="val">{JSON.stringify(val)}</div>;
    }

    const { getByTestId } = render(<Test />);

    expect(getByTestId('val').textContent).toBe(JSON.stringify(mockVal));
    expect(mockedUseSelector).toHaveBeenCalledWith(selectors.getOffer);
  });

  it('useFavoriteOffers returns selector value', () => {
    const mockVal = [{ id: 'f1' }];
    mockedUseSelector.mockReturnValue(mockVal as never);

    function Test() {
      const val = useFavoriteOffers();
      return <div data-testid="val">{JSON.stringify(val)}</div>;
    }

    const { getByTestId } = render(<Test />);

    expect(getByTestId('val').textContent).toBe(JSON.stringify(mockVal));
    expect(mockedUseSelector).toHaveBeenCalledWith(selectors.getFavoriteOffers);
  });

  it('useFavoriteCount returns selector value', () => {
    const mockVal = 5;
    mockedUseSelector.mockReturnValue(mockVal as never);

    function Test() {
      const val = useFavoriteCount();
      return <div data-testid="val">{String(val)}</div>;
    }

    const { getByTestId } = render(<Test />);

    expect(getByTestId('val').textContent).toBe(String(mockVal));
    expect(mockedUseSelector).toHaveBeenCalledWith(selectors.getFavoriteCount);
  });
});
