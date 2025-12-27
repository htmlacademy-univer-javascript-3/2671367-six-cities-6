import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { useOutClick } from './use-out-click';

afterEach(() => {
  vi.clearAllMocks();
});

describe('useOutClick', () => {
  it('calls callback when clicking outside the element', () => {
    const cb = vi.fn();

    function TestComponent() {
      const ref = useRef<HTMLDivElement | null>(null);
      useOutClick(ref, cb);

      return (
        <div>
          <div data-testid="inside" ref={ref} />
          <div data-testid="outside" />
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);

    fireEvent.mouseDown(getByTestId('outside'));

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('doesn`t call callback when clicking inside the element', () => {
    const cb = vi.fn();

    function TestComponent() {
      const ref = useRef<HTMLDivElement | null>(null);
      useOutClick(ref, cb);

      return (
        <div>
          <div data-testid="inside" ref={ref} />
          <div data-testid="outside" />
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);

    fireEvent.mouseDown(getByTestId('inside'));

    expect(cb).not.toHaveBeenCalled();
  });

  it('removes listener on unmount', () => {
    const cb = vi.fn();

    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    function TestComponent() {
      const ref = useRef<HTMLDivElement | null>(null);
      useOutClick(ref, cb);
      return <div ref={ref} />;
    }

    const { unmount } = render(<TestComponent />);

    expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

    const handler = addSpy.mock.calls.find(
      (call) => call[0] === 'mousedown'
    )?.[1] as EventListener;

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('mousedown', handler);

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
