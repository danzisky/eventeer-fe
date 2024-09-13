import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Base API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Hhandle error before sending the request
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error globally
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
