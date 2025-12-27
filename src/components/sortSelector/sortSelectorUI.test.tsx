import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, within } from '@testing-library/react';
import { SortSelectorUI } from './sortSelectorUI';

const OPTIONS = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
];

afterEach(() => vi.clearAllMocks());

describe('SortSelectorUI', () => {
  it('shows selected option label and toggles options list', () => {
    const onChange = vi.fn();
    const { container } = render(
      <SortSelectorUI value="one" options={OPTIONS} onChange={onChange} />
    );

    const toggle = container.querySelector(
      '.places__sorting-type'
    ) as HTMLElement;
    expect(within(toggle).getByText('One')).toBeInTheDocument();

    fireEvent.click(toggle);

    const optionsList = container.querySelector(
      '.places__options'
    ) as HTMLElement;
    const optionTwo = within(optionsList).getByText('Two');

    fireEvent.click(optionTwo);

    expect(onChange).toHaveBeenCalledWith('two');
  });
});
