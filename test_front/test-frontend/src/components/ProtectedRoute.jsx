// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth.js";

const ProtectedRoute = ({ children }) => {
  // Weryfikacja autoryzacji
  const token = getToken();

  // Opcjonalnie: użyj dodatkowej funkcji `isAuthenticated` do sprawdzenia ważności tokena
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jeśli użytkownik jest zalogowany, renderuj zawartość
  return children;
};

export default ProtectedRoute;
