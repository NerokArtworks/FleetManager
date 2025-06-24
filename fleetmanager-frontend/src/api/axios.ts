import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5165/api',
  withCredentials: true,
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      console.log(err.response?.status)
      // logout automático
      // window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;