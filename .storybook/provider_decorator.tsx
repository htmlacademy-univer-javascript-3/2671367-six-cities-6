import { StoryContext, StoryFn } from '@storybook/react';
import { StoreProvider } from '../src/app/providers/store';
import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '../src/app/providers/store/model/state_interfaces';

export interface ProviderDecoratorProps {
  initialState?: DeepPartial<StateSchema>;
}

export const ProviderDecorator =
  (defaultProps: ProviderDecoratorProps = {}) =>
  (Story: StoryFn, context: StoryContext) => {
    const storyParams: ProviderDecoratorProps =
      (context.parameters?.store as ProviderDecoratorProps | undefined) ?? {};
    const merged = { ...defaultProps, ...storyParams };
    const { initialState } = merged;

    return (
      <StoreProvider initialState={initialState}>
        <Story />
      </StoreProvider>
    );
  };
