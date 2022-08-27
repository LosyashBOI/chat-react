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
    setToken(state, action) {
      state.token = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setToken, setName, setEmail, setAuth, setUser } = actions;
export { reducer };
