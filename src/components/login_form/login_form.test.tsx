import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, waitFor } from '@testing-library/react';

import { LoginForm } from './login_form';
import { renderWithProviders } from '../../tests/renderWithProviders';
import * as userHooks from '../../entities/user';
import { mockedUseAppDispatch, navigateMock } from '../../setupTests';
import { AppDispatch } from '../../app/providers/store';

beforeEach(() => {
  vi.clearAllMocks();
  navigateMock.mockClear();
});

describe('LoginForm', () => {
  it('submits and navigates on success', async () => {
    const dispatchMock = vi.fn(() => ({
      unwrap: () => Promise.resolve(),
    })) as unknown as AppDispatch;
    mockedUseAppDispatch.mockReturnValue(dispatchMock);
    const spy = vi
      .spyOn(userHooks, 'useAuthError')
      .mockReturnValue(null as never);

    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <LoginForm />
    );

    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'a@b.com', name: 'email' },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'pass', name: 'password' },
    });

    fireEvent.click(getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalledWith('/');
    });

    spy.mockRestore();
  });

  it('shows auth error message when selector provides an error', () => {
    // Arrange
    const err = { message: 'auth failed' } as const;
    vi.spyOn(userHooks, 'useAuthError').mockReturnValue(err as never);

    // Act
    const { getByText } = renderWithProviders(<LoginForm />);

    // Assert
    expect(getByText(/auth failed/i)).toBeInTheDocument();
  });
});
