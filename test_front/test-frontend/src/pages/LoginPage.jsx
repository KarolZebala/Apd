import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { login } from "../api/userApi";
import { jwtDecode } from "jwt-decode";
import "../styles/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isFormValid = username && password;

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      console.log("Received token:", token); // Logowanie tokenu

      localStorage.setItem("jwtToken", token);

      // Dekodowanie tokenu JWT
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded); // Logowanie zawartości tokenu

      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("User role:", role); // Logowanie roli użytkownika

      // Przekierowanie w zależności od roli
      if (role === "Student") {
        navigate("/student");
      } else if (role === "Promoter") {
        navigate("/promoter");
      } else {
        setError("Unknown role. Please contact the administrator.");
      }

      setError(null);
    } catch (err) {
      console.error("Error during login:", err.message);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <h1>Archiwum prac dyplomowych</h1>
      <FormField
        label="Login"
        type="text"
        value={username}
        onChange={setUsername}
      />
      <FormField
        label="Hasło"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <button
        className="login-button"
        onClick={handleLogin}
        disabled={!isFormValid}
      >
        Zaloguj
      </button>
      {error && <p className="error-message">{error}</p>}
      <Link to="/register" className="login-link">
        Rejestracja
      </Link>
    </div>
  );
};

export default LoginPage;
