import axios from 'axios';
import useUserStore from './useUserStore';

const baseURL = import.meta.env.VITE_API_URL;
const addressURL = import.meta.env.VITE_ADDRESS_API_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain',
  },
});

const addressApi = axios.create({
  baseURL: addressURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const { user } = useUserStore.getState();
    const token = user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error('Token not available!');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor cho response để xử lý lỗi 401
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.error('Unauthorized!');

//       // Kiểm tra xem có phải lỗi khi login không
//       if (error.config.url.includes('/login')) {
//         console.error('Login failed, wrong credentials!');
//       } else {
//         console.error('Unauthorized! Redirecting to login...');

//         // Chuyển hướng tới trang đăng nhập nếu cần
//         if (error.config.onUnauthorizedCallback) {
//           error.config.onUnauthorizedCallback();
//         }
//       }
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
export { addressApi };
