import axios from "axios";

const apiUrl = "http://localhost:8080"; // Zmień na pełną ścieżkę backendu, jeśli korzystasz z innego serwera

// Funkcja pobierająca nagłówki autoryzacji
const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Funkcja logowania
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/User/Login`, {
      username,
      password,
    });

    const token = response.data.token; // Zakładamy, że backend zwraca token w `data.token`
    if (token) {
      localStorage.setItem("jwtToken", token); // Zapisujemy token
    }

    return response.data; // Zwraca token i inne dane użytkownika
  } catch (error) {
    throw error.response?.data || { message: "Błąd podczas logowania" };
  }
};

// Funkcja rejestracji (bez wymogu tokena)
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
    throw error.response?.data || { message: "Błąd podczas rejestracji" };
  }
};

// Funkcja tworzenia dyplomu
export const createDiploma = async (diplomaData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/Diploma/AddDiploma`,
      diplomaData,
      {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Błąd podczas tworzenia dyplomu." }
    );
  }
};

// Funkcja szukania dyplomu
export const searchDiploma = async (diplomaData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/Diploma/SearchDiploma`,
      diplomaData,
      {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Błąd podczas szukania dyplomu." };
  }
};

// Funkcja szukania użytkowników
export const searchUsers = async (searchString, role) => {
  try {
    const response = await fetch(
      `${apiUrl}/User/Search?searchString=${encodeURIComponent(
        searchString
      )}&role=${role}`,
      {
        headers: getAuthHeaders(),
      }
    );
    if (!response.ok) throw new Error("Error fetching users");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};

// Pobieranie ID użytkownika po nazwie i roli
export const getUserIdByUsernameAndRole = async (username, role) => {
  try {
    const users = await searchUsers(username, role);
    if (users.length > 0) {
      return users[0].id; // Zakładamy, że API zwraca tablicę i bierzemy pierwszy wynik
    }
    return null;
  } catch (error) {
    console.error("Błąd podczas pobierania ID użytkownika:", error);
    return null;
  }
};

// Pobieranie danych użytkownika po ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/User/GetUserById`, {
      params: { id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania użytkownika:", error);
    return null;
  }
};

// Funkcja aktualizacji dyplomu
export const updateDiploma = async (diplomaData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/Diploma/UpdateDiploma`,
      diplomaData,
      {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Błąd podczas aktualizacji dyplomu." }
    );
  }
};

export const me = async () => {
  try {
    const response = await axios.get(`${apiUrl}/User/Me`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Błąd podczas pobierania danych użytkownika.",
      }
    );
  }
};
