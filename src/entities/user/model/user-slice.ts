import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '..';
import { checkAuth } from '../data/check-user-auth';
import { login } from '../data/login-user';
import { logout } from '../data/logout-user';
import { AuthorizationStatus } from '../../../consts';

const initialState: UserState = {
  authStatus: AuthorizationStatus.Unknown,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.authError = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state, action) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.authError = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = undefined;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.rejected, (state) => {
        state.user = undefined;
      }),
});

export const userReducer = userSlice.reducer;
