import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, within } from '@testing-library/react';
import * as offer_hooks from '../../entities/offer/hooks/offer_hooks';
import { SortSelector } from './sort_selector';

vi.mock('../../entities/offer/hooks/offer_hooks', async () => {
  const actual = await vi.importActual<typeof offer_hooks>(
    '../../entities/offer/hooks/offer_hooks'
  );
  return {
    ...actual,
    useOfferSort: vi.fn(),
    useSetOfferSort: vi.fn(),
  };
});

const mockedUseOfferSort = vi.mocked(offer_hooks.useOfferSort);
const mockedUseSetOfferSort = vi.mocked(offer_hooks.useSetOfferSort);

afterEach(() => vi.clearAllMocks());

describe('SortSelector', () => {
  it('calls setSort on valid option selection', () => {
    mockedUseOfferSort.mockReturnValue('popular-desc');
    const setSort = vi.fn();
    mockedUseSetOfferSort.mockReturnValue(setSort);

    const { container } = render(<SortSelector />);

    const toggle = container.querySelector(
      '.places__sorting-type'
    ) as HTMLElement;
    fireEvent.click(toggle);

    const optionsList = container.querySelector(
      '.places__options'
    ) as HTMLElement;
    const option = within(optionsList).getByText('Price: low to high');

    fireEvent.click(option);

    expect(setSort).toHaveBeenCalledWith('price-asc');
  });

  it('does not call setSort on invalid option', () => {
    mockedUseOfferSort.mockReturnValue('popular-desc');
    const setSort = vi.fn();
    mockedUseSetOfferSort.mockReturnValue(setSort);

    const { container } = render(<SortSelector />);

    const toggle = container.querySelector(
      '.places__sorting-type'
    ) as HTMLElement;
    fireEvent.click(toggle);

    const optionsList = container.querySelector(
      '.places__options'
    ) as HTMLElement;

    const fakeOption = document.createElement('li');
    fakeOption.textContent = 'Invalid Option';
    fakeOption.onclick = () => {};
    optionsList.appendChild(fakeOption);

    fireEvent.click(fakeOption);

    expect(setSort).not.toHaveBeenCalled();
  });
});
