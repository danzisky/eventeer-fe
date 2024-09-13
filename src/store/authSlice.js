import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import api from '@/lib/axios';

const initialState = {
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.token;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

// Helper function to refresh token
export const refreshAccessToken = () => async (dispatch, getState) => {
  const { refreshToken } = getState().auth;
  if (!refreshToken) return;

  try {
    const { data: { token } } = await api.post('/auth/refresh', { refreshToken });
    const user = jwtDecode(token);
    dispatch(setAuth({ token, refreshToken, user }));
    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Token refresh failed:', error);
    dispatch(logout());
  }
};

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    const { data: { token, refreshToken } } = await api.post('/auth/login', { email, password });
    const user = jwtDecode(token);
    dispatch(setAuth({ token, refreshToken, user }));
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Signup action
export const signup = (username, email, password) => async (dispatch) => {
  try {
    const { data: { token, refreshToken } } = await api.post('/auth/register', { username, email, password });
    const user = jwtDecode(token);
    dispatch(setAuth({ token, refreshToken, user }));
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (err) {
    console.error('Signup failed:', err.response?.data || err.message);
  }
};

// Rehydrate auth state on app load
export const rehydrateAuth = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = JSON.parse(localStorage.getItem('user'));

  if (token && refreshToken && user) {
    const decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now();

    if (isExpired) {
      dispatch(logout());
    } else {
      dispatch(setAuth({ token, refreshToken, user }));
    }
  } else {
    dispatch(logout());
  }
};

export default authSlice.reducer;
