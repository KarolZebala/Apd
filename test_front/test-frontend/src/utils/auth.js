// src/utils/auth.js
import axios from 'axios';

const apiUrl = 'http://localhost:8080';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};