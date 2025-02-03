import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { login, verifyUserRole } from "../api/userApi";
import { jwtDecode } from "jwt-decode";
import "../styles/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const isFormValid = username && password;

  const handleLogin = async () => {
    setIsLocked(true);
    try {
      const token = await login(username, password);
      console.log("Received token:", token);

      localStorage.setItem("jwtToken", token);
      const decoded = jwtDecode(token);

      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      // Dodatkowa weryfikacja z API
      const isValidUser = await verifyUserRole(username, role);
      if (!isValidUser) {
        throw new Error(
          "Weryfikacja nie powiodła się. Skontaktuj się z administratorem."
        );
      }

      setIsSuccess(true);
      setError(null);

      setTimeout(() => {
        if (role === "Student") {
          navigate("/student");
        } else if (role === "Professor") {
          navigate("/promoter");
        } else {
          setError("Nieznana rola. Skontaktuj się z administratorem.");
          setIsLocked(false);
        }
      }, 3000);
    } catch (err) {
      console.error("Błąd podczas logowania:", err.message);
      setError(err.message || "Nieprawidłowa nazwa użytkownika lub hasło.");
      setIsLocked(false);
    }
  };

  return (
    <div className={`page-container ${isSuccess ? "dimmed" : ""}`}>
      {isSuccess && (
        <div className="success-message-overlay">
          <p>Login successful!</p>
        </div>
      )}
      {isLocked && <div className="interaction-blocker"></div>}
      <div className="form-container">
        <h1 className="form-title">Login</h1>
        <FormField
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
          disabled={isLocked}
        />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          disabled={isLocked}
        />
        <button
          className="form-button"
          onClick={handleLogin}
          disabled={!isFormValid || isLocked}
        >
          Login
        </button>
        {error && <p className="form-field-error-message">{error}</p>}

        <Link to="/register" className="form-link-button" disabled={isLocked}>
          Go to Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
