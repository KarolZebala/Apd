// src/utils/api.js
import axios from 'axios';

const apiUrl = 'http://localhost:8080';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${apiUrl}/${endpoint}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${apiUrl}/${endpoint}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('API post error:', error);
    throw error;
  }
};