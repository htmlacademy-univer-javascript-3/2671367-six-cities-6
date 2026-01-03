import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginForm } from './login-form';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm',
  component: LoginForm,
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  parameters: {
    store: { initialState: { user: { authStatus: 'NO_AUTH' } } },
  },
};

// Note: auth error is read from store; to illustrate error state you can add a decorator
export const WithError: Story = {
  parameters: {
    store: {
      initialState: {
        user: {
          authStatus: 'NO_AUTH',
          authError: {
            errorType: 'UNEXPECTED_ERROR',
            message: 'Invalid credentials',
            details: [],
          },
        },
      },
    },
  },
};
