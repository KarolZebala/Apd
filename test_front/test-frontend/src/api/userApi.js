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
    const response = await axios.post(
      `${apiUrl}/Diploma/AddDiploma`,
      diplomaData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Zwraca odpowiedź z backendu
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
        },
      }
    );
    return response.data; // Zwraca odpowiedź z backendu
  } catch (error) {
    throw error.response?.data || { message: "Bład podczas szukania dyplomu." };
  }
};

export const searchUsers = async (searchString, role) => {
  try {
    const response = await fetch(
      `http://localhost:8080/User/Search?searchString=${encodeURIComponent(
        searchString
      )}&role=${role}`
    );
    if (!response.ok) throw new Error("Error fetching users");
    return await response.json(); // API powinno zwrócić listę użytkowników
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};

export const getUserIdByUsernameAndRole = async (username, role) => {
  try {
    const users = await searchUsers(username, role);

    if (users.length > 0) {
      return users[0].id; // Zakładamy, że API zwraca tablicę i bierzemy pierwszy wynik
    }

    return null; // Jeśli użytkownik nie został znaleziony
  } catch (error) {
    console.error("Błąd podczas pobierania ID użytkownika:", error);
    return null;
  }
};

// Funkcja pobierania danych użytkownika po ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/User/SearchById`, {
      params: { id: userId },
    });

    return response.data; // Zwraca { userName, email, id }
  } catch (error) {
    console.error("Błąd podczas pobierania użytkownika:", error);
    return null; // Obsługa błędu - zwracamy null, jeśli użytkownik nie zostanie znaleziony
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
        },
      }
    );
    return response.data; // Zwraca odpowiedź z backendu
  } catch (error) {
    console.error(
      "Błąd podczas aktualizacji dyplomu:",
      error.response?.data || error.message
    );
    throw (
      error.response?.data || { message: "Błąd podczas aktualizacji dyplomu." }
    );
  }
};
