import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    token: '',
    isAuth: false,
  },
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setUser } = actions;
export { reducer };
