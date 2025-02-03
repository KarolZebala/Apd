import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import "../styles/header.css";

const Header = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ] || "Unknown User"
        );
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <span className="header-username">Logged in as: {username}</span>
      <button className="header-logout" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
