import axios from "axios";

const apiUrl = "http://localhost:8080"; // Zmień na pełną ścieżkę backendu, jeśli korzystasz z innego serwera

// Funkcja logowania
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/User/Login`, {
      username,
      password,
    });
    return response.data; // Zwraca token
  } catch (error) {
    // Rzuć obiekt błędu, aby komponent mógł go obsłużyć
    throw error.response?.data || { message: "Błąd podczas logowania" };
  }
};

// Funkcja rejestracji
export const register = async (username, email, password, role) => {
  try {
    const response = await axios.post(
      `${apiUrl}/User/Register`,
      {
        username,
        email,
        password,
        role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Zwraca odpowiedź z backendu
  } catch (error) {
    console.error("Error registering:", error.response?.data || error.message);
    // Rzuć obiekt błędu, aby komponent mógł go obsłużyć
    throw error.response?.data || { message: "Błąd podczas rejestracji" };
  }
};

// Funkcja tworzenia dyplomu
export const createDiploma = async (diplomaData) => {
  try {
    const response = await axios.post(`${apiUrl}/Diploma/AddDiploma`, diplomaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Zwraca odpowiedź z backendu
  } catch (error) {
    throw error.response?.data || { message: "Failed to create diploma." };
  }
};
