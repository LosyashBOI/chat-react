import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'activeModal',
  initialState: '',
  reducers: {
    setModal(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = modalSlice;

export const { setModal } = actions;
export { reducer };
