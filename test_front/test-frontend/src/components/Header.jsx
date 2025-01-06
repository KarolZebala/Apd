// src/components/Header.jsx
import React from 'react';
import '../styles/header.css';

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <span className="header-username">Jesteś zalogowany jako: {username}</span>
      <button className="header-logout" onClick={onLogout}>Wyloguj</button>
    </header>
  );
};

export default Header;