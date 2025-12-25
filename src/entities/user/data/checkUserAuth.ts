import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthData } from '..';
import { ThunkConfig } from '../../../app/providers/store';

export const checkAuth = createAsyncThunk<
  UserAuthData,
  void,
  ThunkConfig<void>
>('user/check-auth', async (_, thunkAPI) => {
  const { extra } = thunkAPI;
  const response = await extra.api.get<UserAuthData>('/login');
  return response.data;
});
