import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5454";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 自动从 localStorage 取 token，有就带上，没有就不发 Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
