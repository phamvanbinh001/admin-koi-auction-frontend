import axios from 'axios';
import useUserStore from './useUserStore';

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain',
    },
});


api.interceptors.request.use(
    (config) => {
        const { user } = useUserStore.getState();
        // console.log('current user:', user);

        const token = user.token;
        if (config.requireAuth && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        else if (config.requireAuth && !token) {
            console.error('Token not available!');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             console.log(error.response.message);
//             console.error('Unauthorized!');
//             if (error.config.onUnauthorizedCallback) {
//                 error.config.onUnauthorizedCallback();
//             }
//         }
//         return Promise.reject(error);
//     },
// );

export default api;

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {

//       if (error.config.url.includes('/login')) {
//         console.error('Sai mật khẩu!');
//         /////........................
//       } else {
//         console.error('Unauthorized! Redirecting to login...');
//         if (error.config.onUnauthorizedCallback) {
//           error.config.onUnauthorizedCallback();
//         }
//       }
//     }
//     return Promise.reject(error);
//   },
// );
