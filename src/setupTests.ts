import * as matchers from '@testing-library/jest-dom/matchers';
import * as appHooks from '../src/shared/hooks/appHooks';
import { expect } from 'vitest';
import { ServerError } from './interface/interface';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
expect.extend(matchers as any);

export const navigateMock = vi.fn<(to: string) => void>();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../src/shared/hooks/appHooks', async () => {
  const actual = await vi.importActual<typeof appHooks>(
    '../src/shared/hooks/appHooks'
  );

  return {
    ...actual,
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
  };
});

export const mockedUseAppDispatch = vi.mocked(appHooks.useAppDispatch);
export const mockedUseAppSelector = vi.mocked(appHooks.useAppSelector);
export const mockUnexpectedError: ServerError = {
  errorType: 'UNEXPECTED_ERROR',
  message: 'error',
  details: [],
};

export const mockValidationError: ServerError = {
  errorType: 'VALIDATION_ERROR',
  message: 'error',
  details: [],
};
