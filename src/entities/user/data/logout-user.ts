import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../app/providers/store';
import { removeAccessToken } from '../../../shared/api/auth-token';

export const logout = createAsyncThunk<void, void, ThunkConfig<void>>(
  'user/logout',
  async (_, thunkAPI) => {
    const { extra } = thunkAPI;

    try {
      await extra.api.delete('/login');
    } finally {
      removeAccessToken();
    }
  }
);
