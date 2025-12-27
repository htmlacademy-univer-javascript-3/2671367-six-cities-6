import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';

import * as redux from 'react-redux';
import { useAuthError, useUserAuthData } from './userUsecases';

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

describe('user usecases', () => {
  it('useUserAuthData returns undefined when no user', () => {
    mockedUseSelector.mockReturnValue(undefined);

    function Test() {
      const val = useUserAuthData();
      return <div data-testid="val">{String(val)}</div>;
    }

    const { getByTestId } = render(<Test />);
    expect(getByTestId('val').textContent).toBe('undefined');
  });

  it('useUserAuthData returns user data', () => {
    const user = { id: 'u1', name: 'User' };
    mockedUseSelector.mockReturnValue(user);

    function Test() {
      const val = useUserAuthData();
      return <div data-testid="val">{JSON.stringify(val)}</div>;
    }

    const { getByTestId } = render(<Test />);
    expect(getByTestId('val').textContent).toBe(JSON.stringify(user));
  });

  it('useAuthError returns undefined when no error', () => {
    mockedUseSelector.mockReturnValue(undefined);

    function Test() {
      const val = useAuthError();
      return <div data-testid="val">{String(val)}</div>;
    }

    const { getByTestId } = render(<Test />);
    expect(getByTestId('val').textContent).toBe('undefined');
  });

  it('useAuthError returns auth error', () => {
    const error = 'bad creds';
    mockedUseSelector.mockReturnValue(error);

    function Test() {
      const val = useAuthError();
      return <div data-testid="val">{String(val)}</div>;
    }

    const { getByTestId } = render(<Test />);
    expect(getByTestId('val').textContent).toBe(error);
  });
});
