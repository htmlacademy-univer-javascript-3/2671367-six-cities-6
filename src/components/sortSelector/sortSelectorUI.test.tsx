import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, within } from '@testing-library/react';
import { SortSelectorUI } from './sortSelectorUI';
import * as hooks from '../../shared/hooks/use-out-click';

const OPTIONS = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
];

// afterEach(() => vi.clearAllMocks());

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

  it('closes options list when clicking outside', () => {
    const onChange = vi.fn();
    const { container } = render(
      <SortSelectorUI value="one" options={OPTIONS} onChange={onChange} />
    );

    const toggle = container.querySelector(
      '.places__sorting-type'
    ) as HTMLElement;
    fireEvent.click(toggle); // открываем список
    expect(
      container.querySelector('.places__options--opened')
    ).toBeInTheDocument();

    fireEvent.mouseDown(document.body); // клик вне
    expect(
      container.querySelector('.places__options--opened')
    ).not.toBeInTheDocument();
  });

  it('falls back to first option if value is not in options', () => {
    const onChange = vi.fn();
    const { container } = render(
      <SortSelectorUI
        value="non-existent"
        options={OPTIONS}
        onChange={onChange}
      />
    );

    const toggle = container.querySelector(
      '.places__sorting-type'
    ) as HTMLElement;
    expect(toggle.textContent).toContain('One'); // первая опция по умолчанию
  });

  it('executes useOutClick callback and covers if (isOpen)', () => {
    const onChange = vi.fn();

    const useOutClickMock = vi
      .spyOn(hooks, 'useOutClick')
      .mockImplementation(
        (_ref: React.RefObject<HTMLElement>, cb: () => void) => {
          cb();
        }
      );

    const { container } = render(
      <SortSelectorUI value="one" options={OPTIONS} onChange={onChange} />
    );

    const toggle = container.querySelector(
      '.places__sorting-type'
    ) as HTMLElement;

    fireEvent.click(toggle);

    const mockCb = useOutClickMock.mock.calls[0][1] as () => void;
    mockCb();

    const optionsList = container.querySelector('.places__options');
    expect(optionsList?.classList.contains('places__options--opened')).toBe(
      false
    );
  });
});
