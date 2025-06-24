import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5165/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

export default api;