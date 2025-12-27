import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/react';

import { useSetCity } from './cityHooks';
import { cityActions } from '../model/citySlice';
import { renderWithProviders } from '../../../tests/renderWithProviders';

import { mockedUseAppDispatch } from '../../../setupTests';
import { CityName } from '../constant/cityConsts';

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
