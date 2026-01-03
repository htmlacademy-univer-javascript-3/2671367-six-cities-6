import { describe, it, expect, vi, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { Header } from './header';
import { renderWithProviders } from '../../../tests/render-with-providers';

afterEach(() => vi.clearAllMocks());

describe('Header', () => {
  it('shows Guest when no email provided and Sign in link when not auth', () => {
    const { getByText } = renderWithProviders(
      <Header isAuth={false} onLogout={vi.fn()} />
    );

    expect(getByText('Guest')).toBeInTheDocument();
    expect(getByText('Sign in')).toBeInTheDocument();
  });

  it('shows email, favorite count and Sign out when auth', () => {
    const onLogout = vi.fn();
    const { getByText } = renderWithProviders(
      <Header isAuth onLogout={onLogout} email="a@b.com" favoriteCount={3} />
    );

    expect(getByText('a@b.com')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();

    fireEvent.click(getByText('Sign out'));

    expect(onLogout).toHaveBeenCalled();
  });
});
