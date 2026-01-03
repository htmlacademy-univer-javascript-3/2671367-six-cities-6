import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthData } from '..';
import { ThunkConfig } from '../../../app/providers/store';
import { ServerError } from '../../../interface/interface';
import { setAccessToken } from '../../../shared/api/auth-token';

interface Args {
  email: string;
  password: string;
}
export const login = createAsyncThunk<
  UserAuthData,
  Args,
  ThunkConfig<ServerError>
>('user/login', async (payload, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post<UserAuthData>('/login', {
      ...payload,
    });

    setAccessToken(response.data.token);

    return response.data;
  } catch (e) {
    return rejectWithValue(extra.errorHandler(e));
  }
});
