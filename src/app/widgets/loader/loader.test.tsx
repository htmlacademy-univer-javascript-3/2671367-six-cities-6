import { render, screen } from '@testing-library/react';
import { Loader } from './loader';

describe('Loader', () => {
  it('renders inline spinner', () => {
    render(<Loader size={32} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders fullscreen with backdrop', () => {
    render(<Loader fullscreen />);
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
