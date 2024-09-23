import axios from 'axios';
import store from '@/store';
import { refreshAccessToken, logout } from '@/store/authSlice';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

// Function to subscribe to the refresh process
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

// Function to refresh tokens
function onRefreshed(token) {
  refreshSubscribers.map((cb) => cb(token));
}

// Axios request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor to refresh token on 401 error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response: { status } = {} } = error;
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Add request to queue if refresh is already happening
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await store.dispatch(refreshAccessToken()); // Dispatch refresh action

        isRefreshing = false;
        onRefreshed(newToken);
        refreshSubscribers = [];

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (err) {
        isRefreshing = false;
        store.dispatch(logout()); // Log out user if refresh fails
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
