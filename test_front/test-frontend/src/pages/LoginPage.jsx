import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { login, me } from "../api/userApi";
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

      localStorage.setItem("jwtToken", token);
      const userData = await me();

      setIsSuccess(true);
      setError(null);

      setTimeout(() => {
        if (userData.roles.includes("Student")) {
          navigate("/first");
        } else if (userData.roles.includes("Professor")) {
          navigate("/first");
        } else {
          setError("Unknown role. Please contact the administrator.");
          setIsLocked(false);
        }
      }, 3000);
    } catch (err) {
      console.error("Error during login:", err.message);
      setError(err.message || "Invalid username or password.");
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

        <button
            className="form-button"
            onClick={() => navigate("/register")}
            disabled={isLocked}
          >
            Go to Register
        </button>

      </div>
    </div>
  );
};

export default LoginPage;
