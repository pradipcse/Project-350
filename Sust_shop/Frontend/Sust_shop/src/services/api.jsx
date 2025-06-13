import axios from 'axios';
import store from '../store/store'; // Import the store (if you still use it somewhere else)
import { refreshAccessToken, logout } from '../auth/authSlice';  // Import actions from authSlice

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Replace with your API base URL
});

api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage instead of Redux store
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Token expired, attempt to refresh using refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken,
          });

          // Update the access token in localStorage
          localStorage.setItem('accessToken', response.data.access);

          // Dispatch action to update the access token in Redux (if you're using Redux state for other parts of the app)
          store.dispatch(refreshAccessToken({ accessToken: response.data.access }));

          // Retry the original request with the new access token
          error.config.headers['Authorization'] = `Bearer ${response.data.access}`;
          return axios(error.config);
        // eslint-disable-next-line no-unused-vars
        } catch (refreshError) {
          // If refresh fails, logout the user
          store.dispatch(logout());
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';  // Redirect to login page
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
