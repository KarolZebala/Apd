import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DiplomaDetails from "../components/DiplomaDetails";
import "../styles/promoter.css";

const PromoterPage = ({ username, onLogout }) => {
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const navigate = useNavigate();

  const handleSearchRedirect = () => {
    navigate("/search");
  };

  const handleAddDiploma = () => {
    navigate("/create-diploma");
  };

  return (
    <div className="promoter-page">
      <Header username={username} onLogout={onLogout} />
      <h1>Diploma Thesis Archive</h1>

      <div className="content-container">
        <div className="left-pane">
          <button className="add-diploma-button" onClick={handleAddDiploma}>
            Add Diploma
          </button>

          <button className="search-button" onClick={handleSearchRedirect}>
            Search Diplomas
          </button>
        </div>

        {/* Right Side - Selected Diploma with New Buttons */}
        <div className="right-pane">
          <div className="right-pane-header">
            <button className="supervision-button">Supervision</button>
            <button className="review-button">Review</button>
          </div>
          <h2>Selected Diploma</h2>
          <DiplomaDetails diploma={selectedDiploma} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PromoterPage;
