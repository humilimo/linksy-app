import axios from 'axios';

const axiosAuthInstance = axios.create({
  baseURL: 'http://127.0.0.1:3002',
});

axiosAuthInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
