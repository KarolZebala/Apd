// PromoterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchDiploma } from "../api/userApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/promoter.css";

const PromoterPage = ({ username, onLogout }) => {
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    student: "",
    promoter: "",
    reviewer: "",
    status: "",
  });
  const navigate = useNavigate();

  const handleAddDiploma = () => {
    navigate("/create-diploma");
  };

  const handleSearch = async () => {
    try {
      const request = {
        searchString: null,
        studentIds: searchParams.student ? [searchParams.student] : null,
        promoterIds: searchParams.promoter ? [searchParams.promoter] : null,
        reviewerIds: searchParams.reviewer ? [searchParams.reviewer] : null,
        status: searchParams.status || null,
        pageNumber: 1,
        pageSize: 10,
      };

      const results = await searchDiploma(request);
      setSearchResults(results || []);
    } catch (error) {
      console.error("Error searching diplomas:", error);
    }
  };

  return (
    <div className="promoter-page">
      <Header username={username} onLogout={onLogout} />
      <h1>Archiwum prac dyplomowych</h1>

      <div className="content-container">
        {/* Strona lewa */}
        <div className="left-pane">
          <button className="add-diploma-button" onClick={handleAddDiploma}>
            Add Diploma
          </button>

          <h2>Szukaj dyplomu</h2>
          <div className="search-fields">
            <div className="search-field">
              <label>Student - autor:</label>
              <input
                type="text"
                className="search-input"
                placeholder="Wprowadź nazwisko..."
                value={searchParams.student}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, student: e.target.value })
                }
              />
            </div>
            <div className="search-field">
              <label>Promotor:</label>
              <input
                type="text"
                className="search-input"
                placeholder="Wprowadź nazwisko..."
                value={searchParams.promoter}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, promoter: e.target.value })
                }
              />
            </div>
            <div className="search-field">
              <label>Recenzent:</label>
              <input
                type="text"
                className="search-input"
                placeholder="Wprowadź nazwisko..."
                value={searchParams.reviewer}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, reviewer: e.target.value })
                }
              />
            </div>
            <div className="search-field">
              <label>Status:</label>
              <input
                type="text"
                className="search-input"
                placeholder="Wprowadź status..."
                value={searchParams.status}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, status: e.target.value })
                }
              />
            </div>
            <button className="search-button" onClick={handleSearch}>
              Szukaj
            </button>
          </div>

          <div className="diplomas-table">
            <h3>Lista dyplomów</h3>
            <table className="diploma-table">
              <thead>
                <tr>
                  <th>Dyplomy</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((diploma) => (
                  <tr
                    key={diploma.diplomaId}
                    className="diploma-table-row"
                    onClick={() => setSelectedDiploma(diploma)}
                  >
                    <td className="diploma-table-cell">{diploma.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strona prawa */}
        <div className="right-pane">
          <h2>Wybrany dyplom</h2>
          <table className="selected-diploma-table">
            <thead>
              <tr>
                <th>Pole</th>
                <th>Wartość</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Diploma ID</td>
                <td>{selectedDiploma?.diplomaId || "-"}</td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{selectedDiploma?.title || "-"}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{selectedDiploma?.type || "-"}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{selectedDiploma?.description || "-"}</td>
              </tr>
              <tr>
                <td>Department Name</td>
                <td>{selectedDiploma?.departmentName || "-"}</td>
              </tr>
              <tr>
                <td>Course</td>
                <td>{selectedDiploma?.course || "-"}</td>
              </tr>
              <tr>
                <td>Create Date</td>
                <td>{selectedDiploma?.createDate || "-"}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{selectedDiploma?.status || "-"}</td>
              </tr>
              <tr>
                <td>Student ID</td>
                <td>{selectedDiploma?.studentId || "-"}</td>
              </tr>
              <tr>
                <td>Promoter ID</td>
                <td>{selectedDiploma?.promoterId || "-"}</td>
              </tr>
              <tr>
                <td>Reviewer ID</td>
                <td>{selectedDiploma?.reviewerId || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PromoterPage;
