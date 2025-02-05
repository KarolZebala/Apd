import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DiplomaActions from "../components/DiplomaActions";
import RoleSwitcher from "../components/RoleSwitcher";
import DiplomaListGrouped from "../components/DiplomaListGrouped";
import DiplomaDetails from "../components/DiplomaDetails";
import useUserData from "../hooks/useUserData";
import useDiplomas from "../hooks/useDiplomas";
import "../styles/promoter.css";

const First = ({ username, onLogout }) => {
  const navigate = useNavigate();
  const { userId, userRole, setUserRole } = useUserData();
  const {
    diplomas,
    selectedDiploma,
    setSelectedDiploma,
    loading,
    fetchDiplomas,
  } = useDiplomas(userId, userRole);

  const [viewMode, setViewMode] = useState(null);

  useEffect(() => {
    if (userRole === "Professor") {
      setViewMode("supervision");
      fetchDiplomas("supervision");
    } else if (userRole === "Student") {
      fetchDiplomas("student");
    }
  }, [userRole]);

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
    fetchDiplomas(newViewMode);
  };

  return (
    <div className="promoter-page">
      <Header username={username} onLogout={onLogout} />
      <h1>Diploma Thesis Archive</h1>

      <div className="content-container">
        <div className="left-pane">
          <DiplomaActions
            userRole={userRole}
            onSearch={() => navigate("/search")} // Poprawione wywołanie
            onAddDiploma={() => navigate("/create-diploma")} // Poprawione wywołanie
            fetchDiplomas={fetchDiplomas}
            userId={userId}
          />
          <DiplomaListGrouped
            diplomas={diplomas}
            loading={loading}
            setSelectedDiploma={setSelectedDiploma}
            userRole={userRole}
          />
        </div>

        <div className="right-pane">
          {userRole === "Professor" && (
            <RoleSwitcher
              viewMode={viewMode}
              onChangeViewMode={handleViewModeChange}
            />
          )}
          <h2>{userRole === "Student" ? "My Diploma" : "Selected Diploma"}</h2>
          {selectedDiploma ? (
            <DiplomaDetails diploma={selectedDiploma} />
          ) : (
            <p>Please select a diploma to see details.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default First;
