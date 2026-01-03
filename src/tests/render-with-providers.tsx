import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import { RootState } from '../app/providers/store/model/state-types';
import { reducers } from '../app/providers/store/model/reducer';

interface RenderOptions {
  preloadedState?: PreloadedState<RootState>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState }: RenderOptions = {}
) {
  const store = configureStore({
    reducer: reducers,
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}
