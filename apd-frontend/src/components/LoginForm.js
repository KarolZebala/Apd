import React, { useState } from "react";
import { login } from "../api/userApi";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      setToken(token);
      setError(""); // Wyczyść błędy po poprawnym logowaniu
      alert("Zalogowano pomyślnie!");
    } catch (err) {
      setError(err || "Nie udało się zalogować");
    }
  };

  return (
    <div>
      <h1>Logowanie</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nazwa użytkownika:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hasło:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Zaloguj</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {token && <p style={{ color: "green" }}>Token: {token}</p>}
    </div>
  );
};

export default LoginForm;
