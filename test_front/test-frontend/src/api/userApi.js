import axios from "axios";

const apiUrl = "http://localhost:8080"; // Zmień na właściwą ścieżkę backendu

// Pobiera token JWT z localStorage i dodaje go do nagłówków
const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Obsługa żądań z przechwytywaniem błędów
const request = async (method, url, data = null, requiresAuth = false) => {
  try {
    const response = await axios({
      method,
      url: `${apiUrl}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        ...(requiresAuth ? getAuthHeaders() : {}),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Wystąpił błąd" };
  }
};

// Funkcja logowania
export const login = (username, password) =>
  request("POST", "/User/Login", { username, password }).then((data) => {
    if (data.token) localStorage.setItem("jwtToken", data.token);
    return data;
  });

// Funkcja rejestracji
export const register = (username, email, password, role) =>
  request("POST", "/User/Register", { username, email, password, role });

// Pobieranie aktualnie zalogowanego użytkownika
export const me = () => request("GET", "/User/Me", null, true);

// Pobieranie użytkownika po ID
export const getUserById = (userId) =>
  request("GET", `/User/GetUserById?id=${userId}`, null, true);

// Wyszukiwanie użytkowników
export const searchUsers = (searchString, role) =>
  request(
    "GET",
    `/User/Search?searchString=${encodeURIComponent(
      searchString
    )}&role=${role}`,
    null,
    true
  );

// Pobieranie ID użytkownika po nazwie i roli
export const getUserIdByUsernameAndRole = async (username, role) => {
  const users = await searchUsers(username, role);
  return users.length > 0 ? users[0].id : null;
};

// Tworzenie dyplomu
export const createDiploma = (diplomaData) =>
  request("POST", "/Diploma/AddDiploma", diplomaData, true);

// Wyszukiwanie dyplomów
export const searchDiploma = (diplomaData) =>
  request("POST", "/Diploma/SearchDiploma", diplomaData, true);

// Aktualizacja dyplomu
export const updateDiploma = (diplomaData) =>
  request("POST", "/Diploma/UpdateDiploma", diplomaData, true);

export const downloadDiploma = async (diplomaId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/Diploma/DownloadDiploma?diplomaId=${diplomaId}&attachmentId=${diplomaId}`,
      {
        headers: {
          ...getAuthHeaders(),
          Accept: "*/*",
        },
        responseType: "blob", // Pobieramy plik binarnie
      }
    );

    // Tworzenie URL dla pobranego pliku
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Parsowanie nazwy pliku z nagłówka `content-disposition`
    let filename = "diploma.pdf"; // Domyślna nazwa pliku
    const contentDisposition = response.headers["content-disposition"];

    if (contentDisposition) {
      const match = contentDisposition.match(
        /filename\*?=['"]?(?:UTF-8'')?([^"']+)/
      );
      if (match) {
        filename = decodeURIComponent(match[1]);
      }
    }

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error download diploma:", error);
  }
};

export const addDiplomaReview = async (
  diplomaId,
  reviewerId,
  reviewContent
) => {
  try {
    const response = await request(
      "POST",
      "/DiplomaReview/AddReview",
      { diplomaId, reviewerId, reviewContent },
      true
    );
    return response;
  } catch (error) {
    console.error("Błąd podczas dodawania recenzji:", error);
    throw error;
  }
};

export const addExam = async (
  diplomaId,
  examDate,
  score
) => {
  try {
    const response = await request(
      "POST",
      "/Exam/AddExam",
      { diplomaId, examDate, score },
      true
    );
    return response;
  } catch (error) {
    console.error("Błąd podczas tworzenia egzaminu:", error);
    throw error;
  }
};

export const updateExam = async (
  diplomaId,
  examDate,
  score
) => {
  try {
    const response = await request(
      "POST",
      "/Exam/AddExam",
      { diplomaId, examDate, score },
      true
    );
    return response;
  } catch (error) {
    console.error("Błąd podczas tworzenia egzaminu:", error);
    throw error;
  }
};