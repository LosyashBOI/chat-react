import { configureStore } from '@reduxjs/toolkit';

import { MODALS, token, userEmail } from '../utils';
import { reducer as modalReducer } from './modalSlice';
import { reducer as userReducer } from './userSlice';

const preloadedState = {
  user: {
    name: '',
    email: userEmail ?? '',
    token: token ?? '',
    isAuth: !!token,
  },
  activeModal: MODALS.INACTIVE,
};

const store = configureStore({
  reducer: {
    user: userReducer,
    activeModal: modalReducer,
  },
  preloadedState,
});

export default store;
