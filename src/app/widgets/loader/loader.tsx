import { memo } from 'react';
import css from './loader.module.css';

interface LoaderProps {
  size?: number;
  fullscreen?: boolean;
}

function LoaderComponent({ size = 48, fullscreen = false }: LoaderProps) {
  const spinner = (
    <div
      className={css.spinnerWrapper}
      style={{ width: size, height: size }}
      role="status"
      aria-live="polite"
    >
      <svg
        className={css.spinner}
        viewBox="0 0 50 50"
        width={size}
        height={size}
        aria-hidden
      >
        <circle
          className={css.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      <span className="visually-hidden">Loading…</span>
    </div>
  );

  if (fullscreen) {
    return (
      <div className={css.fullscreen}>
        <div className={css.backdrop} data-testid="backdrop" />
        <div className={css.modal}>{spinner}</div>
      </div>
    );
  }

  return spinner;
}

export const Loader = memo(LoaderComponent);
Loader.displayName = 'Loader';
