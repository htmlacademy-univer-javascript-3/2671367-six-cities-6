import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';

import * as redux from 'react-redux';
import { useCityName } from './city-usecases';
import * as selectors from '../model/city-selector';

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

describe('city usecases', () => {
  it('useCityName returns current city name and calls selector', () => {
    mockedUseSelector.mockReturnValue('Paris' as never);

    function Test() {
      const val = useCityName();
      return <div data-testid="val">{String(val)}</div>;
    }

    const { getByTestId } = render(<Test />);

    expect(getByTestId('val').textContent).toBe('Paris');
    expect(mockedUseSelector).toHaveBeenCalledWith(selectors.getCityName);
  });
});
