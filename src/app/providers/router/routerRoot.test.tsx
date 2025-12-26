import { render, screen, waitFor } from '@testing-library/react';
import RouterRoot from './routerRoot';
import { vi } from 'vitest';

vi.mock('../../../pages/mainPage', () => ({ default: () => <div>Main</div> }));
vi.mock('../../../pages/loginPage', () => ({
  default: () => <div>Login</div>,
}));
vi.mock('../../../pages/favoritesPage', () => ({
  default: () => <div>Favorites</div>,
}));
vi.mock('../../../pages/offerPage', () => ({
  default: () => <div>Offer</div>,
}));
vi.mock('../../../pages/notFoundPage', () => ({
  default: () => <div>NotFound</div>,
}));

describe('RouterRoot routes', () => {
  it('renders login page for /login', async () => {
    window.history.pushState({}, '', '/login');
    render(<RouterRoot />);
    await waitFor(() => expect(screen.getByText('Login')).toBeInTheDocument());
  });

  it('renders main page for /', async () => {
    window.history.pushState({}, '', '/');
    render(<RouterRoot />);
    await waitFor(() => expect(screen.getByText('Main')).toBeInTheDocument());
  });

  it('renders not found for unknown path', async () => {
    window.history.pushState({}, '', '/unknown-path');
    render(<RouterRoot />);
    await waitFor(() =>
      expect(screen.getByText('NotFound')).toBeInTheDocument()
    );
  });
});
