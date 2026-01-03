import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/react';

import { useSetCity } from './city-hooks';
import { cityActions } from '../model/city-slice';
import { renderWithProviders } from '../../../tests/render-with-providers';

import { mockedUseAppDispatch } from '../../../setup-tests';
import { CityName } from '../constant/city-consts';

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useSetCity', () => {
  it('dispatches cityActions.setCity with provided city name', () => {
    const dispatchMock = vi.fn();
    mockedUseAppDispatch.mockReturnValue(dispatchMock);

    function TestComponent() {
      const setCity = useSetCity();
      return (
        <button data-testid="btn" onClick={() => setCity(CityName.Paris)} />
      );
    }

    const { getByTestId } = renderWithProviders(<TestComponent />);

    fireEvent.click(getByTestId('btn'));

    expect(dispatchMock).toHaveBeenCalledWith(
      cityActions.setCity(CityName.Paris)
    );
  });
});
