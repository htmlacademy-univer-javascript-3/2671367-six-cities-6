import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '..';

const initialState: UserState = {};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder,
});

export const userReducer = userSlice.reducer;
