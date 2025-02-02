import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentPage from "../pages/StudentPage";
import PromoterPage from "../pages/PromoterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateDiplomaPage from '../pages/CreateDiplomaPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Zabezpieczone strony */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promoter"
          element={
            <ProtectedRoute>
              <PromoterPage />
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
      </Routes>
    </Router>
  );
};

export default AppRouter;
