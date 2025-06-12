import { createSlice } from '@reduxjs/toolkit';

// Load user data and tokens from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));
const storedAccessToken = localStorage.getItem('accessToken');
const storedRefreshToken = localStorage.getItem('refreshToken');

const initialState = {
  user: storedUser || null,
  accessToken: storedAccessToken || null,
  refreshToken: storedRefreshToken || null,
  isAuthenticated: !!storedAccessToken, // Set true if access token exists
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      // Save tokens and user data to localStorage
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      // Remove tokens and user data from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    refreshAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      // Update access token in localStorage
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
  },
});

export const { login, logout, refreshAccessToken } = authSlice.actions;
export default authSlice.reducer;

