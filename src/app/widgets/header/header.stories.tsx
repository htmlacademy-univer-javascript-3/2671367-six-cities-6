import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Guest: Story = {
  args: {
    isAuth: false,
    favoriteCount: 0,
    email: undefined,
    onLogout: () => {},
  },
};

export const LoggedIn: Story = {
  args: {
    isAuth: true,
    favoriteCount: 5,
    email: 'user@example.com',
    onLogout: () => {},
  },
};
