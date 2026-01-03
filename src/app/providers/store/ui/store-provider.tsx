import { Provider } from 'react-redux';
import { StateSchema } from '../model/state-interfaces';
import { ReactNode, useMemo } from 'react';
import { DeepPartial } from '@reduxjs/toolkit';
import { createReduxStore } from '../model/config';

interface StoreProps {
  children: ReactNode;
  initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = ({ children, initialState }: StoreProps) => {
  const store = useMemo(
    () => createReduxStore(initialState as StateSchema),
    [initialState]
  );

  return <Provider store={store}>{children}</Provider>;
};
