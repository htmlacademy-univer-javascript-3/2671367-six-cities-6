import { memo } from 'react';
import css from './Loader.module.css';

interface LoaderProps {
  size?: number;
  fullscreen?: boolean;
}

function LoaderComponent({ size = 48, fullscreen = false }: LoaderProps) {
  const style = {
    width: size,
    height: size,
  };

  if (fullscreen) {
    return (
      <div className={css.fullscreen}>
        <div className={css.spinner} style={style} />
      </div>
    );
  }

  return <div className={css.spinner} style={style} />;
}

export const Loader = memo(LoaderComponent);
Loader.displayName = 'Loader';
