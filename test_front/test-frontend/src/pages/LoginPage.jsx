// LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField';
import { login } from '../api/userApi';
import '../styles/login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const isFormValid = username && password;

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      localStorage.setItem("jwtToken", token);
      alert("Login successful!");
      setError(null);
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <h1>Archiwum prac dyplomowych</h1>
      <FormField label="Login" type="text" value={username} onChange={setUsername} />
      <FormField label="Hasło" type="password" value={password} onChange={setPassword} />
      <button
        className="login-button"
        onClick={handleLogin}
        disabled={!isFormValid}
      >
        Zaloguj
      </button>
      {error && <p className="error-message">{error}</p>}
      <Link to="/register" className="login-link">Rejestracja</Link>
    </div>
  );
};

export default LoginPage;