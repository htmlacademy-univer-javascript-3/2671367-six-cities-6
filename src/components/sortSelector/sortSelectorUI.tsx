import { FC, memo, useState, useRef } from 'react';
import cn from 'classnames';
import { useOutClick } from '../../hooks/use-out-click';

interface Option {
  label: string;
  value: string;
}

interface SortSelectorUIProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

const SortSelectorUIComponent: FC<SortSelectorUIProps> = ({
  value,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);

  useOutClick(listRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((p) => !p)}
      >
        {selectedOption.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
        ref={listRef}
      >
        {options.map((o) => (
          <li
            key={o.value}
            onClick={() => {
              setIsOpen(false);
              onChange(o.value);
            }}
            className={cn('places__option', {
              'places__option--active': selectedOption.value === o.value,
            })}
            tabIndex={0}
          >
            {o.label}
          </li>
        ))}
      </ul>
    </form>
  );
};

export const SortSelectorUI = memo(SortSelectorUIComponent);
