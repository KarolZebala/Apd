import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DiplomaDetails from "../components/DiplomaDetails";
import DiplomaList from "../components/DiplomaList";
import DiplomaActions from "../components/DiplomaActions";
import RoleSwitcher from "../components/RoleSwitcher";
import "../styles/promoter.css";
import { me, searchDiploma } from "../api/userApi";

const PromoterPage = ({ username, onLogout }) => {
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const [diplomas, setDiplomas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await me();
        setUserId(userData.id);
        setUserRole(userData.roles[0]);

        if (userData.roles[0] === "Professor") {
          setViewMode("supervision");
          fetchDiplomas("supervision", userData.id, userData.roles[0]);
        } else if (userData.roles[0] === "Student") {
          fetchDiplomas("student", userData.id, userData.roles[0]);
        }
      } catch (error) {}
    };
    fetchUserData();
  }, []);

  const fetchDiplomas = async (roleId, id, role) => {
    if (!id || !role) return;
    setLoading(true);

    try {
      let request = { pageNumber: 1, pageSize: 10 };

      if (role === "Professor") {
        if (roleId === "supervision") request.promoterIds = [id];
        else if (roleId === "review") request.reviewerIds = [id];
      } else if (role === "Student") {
        request.studentIds = [id];
      }

      const results = await searchDiploma(request);
      setDiplomas(results || []);
    } catch (error) {
      console.error("Error fetching diplomas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
    fetchDiplomas(newViewMode, userId, userRole);
  };

  const handleSearchRedirect = () => navigate("/search");
  const handleAddDiploma = () => navigate("/create-diploma");

  return (
    <div className="promoter-page">
      <Header username={username} onLogout={onLogout} />
      <h1>Diploma Thesis Archive</h1>

      <div className="content-container">
        <div className="left-pane">
          <DiplomaActions
            userRole={userRole}
            onSearch={handleSearchRedirect}
            onAddDiploma={handleAddDiploma}
            fetchDiplomas={fetchDiplomas}
            userId={userId}
          />

          <h2>
            {userRole === "Professor"
              ? viewMode === "supervision"
                ? "Supervision Panel"
                : "Review Panel"
              : "My Diploma"}
          </h2>

          <DiplomaList
            diplomas={diplomas}
            loading={loading}
            selectedDiploma={selectedDiploma}
            onSelectDiploma={setSelectedDiploma}
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

export default PromoterPage;
