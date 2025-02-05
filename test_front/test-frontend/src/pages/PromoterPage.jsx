import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DiplomaDetails from "../components/DiplomaDetails";
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

  // Pobranie danych użytkownika
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

  // Pobieranie listy dyplomów
  const fetchDiplomas = async (roleId, id, role) => {
    if (!id || !role) return;
    setLoading(true);

    try {
      let request = {
        pageNumber: 1,
        pageSize: 10,
      };

      if (role === "Professor") {
        if (roleId === "supervision") {
          request.promoterIds = [id];
        } else if (roleId === "review") {
          request.reviewerIds = [id];
        }
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

  // Obsługa zmiany widoku dla profesora
  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
    fetchDiplomas(newViewMode, userId, userRole);
  };

  // Nawigacja do wyszukiwarki prac
  const handleSearchRedirect = () => {
    navigate("/search");
  };

  // Nawigacja do dodania pracy (dla promotora)
  const handleAddDiploma = () => {
    navigate("/create-diploma");
  };

  return (
    <div className="promoter-page">
      <Header username={username} onLogout={onLogout} />
      <h1>Diploma Thesis Archive</h1>

      <div className="content-container">
        {/* Lewa sekcja - przyciski i lista dyplomów */}
        <div className="left-pane">
          {/* Przyciski dla Professor */}
          {userRole === "Professor" && (
            <div className="action-buttons">
              <button className="add-diploma-button" onClick={handleAddDiploma}>
                Add Diploma
              </button>
              <button className="search-button" onClick={handleSearchRedirect}>
                Search Diplomas
              </button>
            </div>
          )}

          {/* Przyciski dla Student */}
          {userRole === "Student" && (
            <div className="action-buttons">
              <button className="search-button" onClick={handleSearchRedirect}>
                Search Diplomas
              </button>
              <button
                className="search-button"
                onClick={() => fetchDiplomas("student", userId, userRole)}
              >
                My Diploma
              </button>
            </div>
          )}

          {/* Nagłówek zależny od roli */}
          <h2>
            {userRole === "Professor"
              ? viewMode === "supervision"
                ? "Supervision Panel"
                : "Review Panel"
              : "My Diploma"}
          </h2>

          {/* Lista dyplomów */}
          {loading ? (
            <p>Loading diplomas...</p>
          ) : diplomas.length === 0 ? (
            <p>No diplomas found.</p>
          ) : (
            <ul className="diploma-list">
              {diplomas.map((diploma) => (
                <li
                  key={diploma.id}
                  onClick={() => setSelectedDiploma(diploma)}
                  className={
                    selectedDiploma?.id === diploma.id ? "selected" : ""
                  }
                >
                  {diploma.title} - {diploma.studentName}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Prawa sekcja - szczegóły dyplomu */}
        <div className="right-pane">
          {userRole === "Professor" && (
            <div className="right-pane-header">
              <button
                className={`supervision-button ${
                  viewMode === "supervision" ? "active" : ""
                }`}
                onClick={() => handleViewModeChange("supervision")}
              >
                Supervision
              </button>
              {/* <button
                className={`review-button ${
                  viewMode === "review" ? "active" : ""
                }`}
                onClick={() => handleViewModeChange("review")}
              >
                Review
              </button> */}
            </div>
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
