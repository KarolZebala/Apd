import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth"; // Import funkcji logout
import "../styles/header.css";

const Header = ({ username }) => {
  const navigate = useNavigate(); // Hook do nawigacji

  const handleLogout = () => {
    logout(); // Wywołanie funkcji logout
    navigate("/login"); // Przekieruj na stronę logowania
  };

  return (
    <header className="header">
      <span className="header-username">
        Jesteś zalogowany jako: {username}
      </span>
      <button className="header-logout" onClick={handleLogout}>
        Wyloguj
      </button>
    </header>
  );
};

export default Header;
