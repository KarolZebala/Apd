// userApi.js
import axios from "axios";

const apiUrl = "/User"; // Aktualna ścieżka do backendu

// Funkcja logowania
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/Login`, {
      username,
      password,
    });
    return response.data; // Zwraca token
  } catch (error) {
    throw error.response?.data || "Error logging in";
  }
};

// Funkcja rejestracji
export const register = async (username, email, password, role) => {
  try {
    const response = await axios.post(
      `${apiUrl}/Register`,
      {
        username,
        email,
        password,
        role,
      },
      {
        headers: {
          "Content-Type": "application/json", // Domyślny nagłówek
        },
      }
    );
    return response.data; // Zwraca odpowiedź z backendu
  } catch (error) {
    console.error("Error registering:", error.response?.data || error.message);
    throw error.response?.data || "Error registering";
  }
};