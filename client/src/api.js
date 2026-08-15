import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5002/api'
});

export function setToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('portfolio_token', token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem('portfolio_token');
  }
}

const existing = localStorage.getItem('portfolio_token');
if (existing) setToken(existing);
