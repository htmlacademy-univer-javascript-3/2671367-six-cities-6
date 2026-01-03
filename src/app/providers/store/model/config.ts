import { configureStore, DeepPartial } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from './state_interfaces';
import { reducers } from './reducer';

import { apiErrorHandler } from '../../../../shared/api/errorHandler';
import { createAPI } from '../../../../shared/api/api';

const api = createAPI();

export const createReduxStore = (initialState?: DeepPartial<StateSchema>) =>
  configureStore({
    preloadedState: initialState as StateSchema,
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: api,
            errorHandler: apiErrorHandler,
          } as ThunkExtraArg,
        },
      }),
  });
