import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as redux from 'react-redux';

import { AuthorizationStatus, AppRoute } from '../../../consts';
import ProtectRoute from './protect_route';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof redux>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

vi.mock('../../widgets/loader/loader', () => ({
  Loader: ({ fullscreen }: { fullscreen?: boolean }) => (
    <div data-testid="loader">{fullscreen ? 'fullscreen' : ''}</div>
  ),
}));

const mockedUseSelector = vi.mocked(redux.useSelector);

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={['/private']}>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/private" element={<div>PRIVATE CONTENT</div>} />
        </Route>
        <Route path={AppRoute.Login} element={<div>LOGIN PAGE</div>} />
      </Routes>
    </MemoryRouter>
  );

afterEach(() => {
  vi.clearAllMocks();
});

describe('ProtectRoute', () => {
  it('renders Loader when authorization status is Unknown', () => {
    mockedUseSelector.mockReturnValue(AuthorizationStatus.Unknown);

    renderWithRouter();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders Outlet when user is authorized', () => {
    mockedUseSelector.mockReturnValue(AuthorizationStatus.Auth);

    renderWithRouter();

    expect(screen.getByText('PRIVATE CONTENT')).toBeInTheDocument();
  });

  it('redirects to login when user is not authorized', () => {
    mockedUseSelector.mockReturnValue(AuthorizationStatus.NoAuth);

    renderWithRouter();

    expect(screen.getByText('LOGIN PAGE')).toBeInTheDocument();
  });
});
