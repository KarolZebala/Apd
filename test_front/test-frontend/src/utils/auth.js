import axios from "axios";

const apiUrl = "http://localhost:8080";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/User/Login`, {
      username,
      password,
    });
    console.log("Backend response:", response.data); // Logowanie odpowiedzi serwera
    return response.data; // Oczekiwane, że backend zwraca token JWT
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error("Login failed");
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
};

export const getToken = () => {
  return localStorage.getItem("jwtToken");
};
