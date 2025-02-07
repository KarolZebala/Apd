import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CreateDiplomaPage from "../pages/CreateDiplomaPage";
import SearchPage from "../pages/DiplomaSearch"; // <-- Import nowej strony
import ProtectedRoute from "../components/ProtectedRoute";
import First from "../pages/First";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Zabezpieczone strony */}
        <Route
          path="/first"
          element={
            <ProtectedRoute>
              <First />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-diploma"
          element={
            <ProtectedRoute>
              <CreateDiplomaPage />
            </ProtectedRoute>
          }
        />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
