import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { me } from "../api/userApi";
import "../styles/header.css";

const Header = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await me(); // Pobieramy dane użytkownika z backendu
        setUsername(userData.userName); // Ustawiamy nazwę użytkownika
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <span className="header-username">
        Logged in as: {username || "Guest"}
      </span>
      <button className="header-logout" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
