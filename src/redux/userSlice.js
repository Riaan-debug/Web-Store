import { createSlice } from '@reduxjs/toolkit';
import { loadUser } from './persistState';

const initialState = {
  user: loadUser(),
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { register, login, logout, setError } = userSlice.actions;
export default userSlice.reducer;
