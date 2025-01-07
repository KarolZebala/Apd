// RegisterPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormField from "../components/FormField";
import { register } from "../api/userApi";
import "../styles/register.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const isFormValid =
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword === formData.password;

  const handleRegister = async () => {
    try {
      const response = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );
      setMessage(response.message);
      setError(null);
      alert("Rejestracja zakończona sukcesem!");
    } catch (err) {
      setError("Nie udało się zarejestrować. Sprawdź poprawność danych.");
      setMessage(null);
    }
  };

  return (
    <div className="register-page">
      <h1>Rejestracja</h1>
      <FormField
        label="Login"
        type="text"
        value={formData.username}
        onChange={(value) => setFormData({ ...formData, username: value })}
      />
      <FormField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
      />
      <FormField
        label="Hasło"
        type="password"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, password: value })}
      />
      <FormField
        label="Powtórz hasło"
        type="password"
        value={formData.confirmPassword}
        onChange={(value) =>
          setFormData({ ...formData, confirmPassword: value })
        }
      />
      <select
        className="register-select"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="Student">Student</option>
        <option value="Professor">Profesor</option>
      </select>
      <button
        className="register-button"
        onClick={handleRegister}
        disabled={!isFormValid}
      >
        Utwórz konto
      </button>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <Link to="/login" className="register-link">
        Logowanie
      </Link>
    </div>
  );
};

export default RegisterPage;
