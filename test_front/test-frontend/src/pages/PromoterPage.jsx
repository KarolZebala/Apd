import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchDiploma, getUserById } from "../api/userApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserSearch from "../components/UserSearch";
import "../styles/promoter.css";

const PromoterPage = ({ username, onLogout }) => {
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    title: "",
    student: "",
    promoter: "",
    reviewer: "",
    status: "",
    tag: "",
  });

  const [studentName, setStudentName] = useState("-");
  const [promoterName, setPromoterName] = useState("-");
  const [reviewerName, setReviewerName] = useState("-");

  const navigate = useNavigate();

  const handleAddDiploma = () => {
    navigate("/create-diploma");
  };

  const handleSearch = async () => {
    try {
      const request = {
        searchString: searchParams.title || null,
        studentIds: searchParams.student ? [searchParams.student] : null,
        promoterIds: searchParams.promoter ? [searchParams.promoter] : null,
        reviewerIds: searchParams.reviewer ? [searchParams.reviewer] : null,
        status: searchParams.status || null,
        tag: searchParams.tag || null,
        pageNumber: 1,
        pageSize: 10,
      };

      const results = await searchDiploma(request);
      setSearchResults(results || []);
    } catch (error) {
      console.error("Error searching diplomas:", error);
    }
  };

  const fetchUserDetails = async (studentId, promoterId, reviewerId) => {
    try {
      if (studentId) {
        const student = await getUserById(studentId);
        setStudentName(student?.userName || "-");
      }
      if (promoterId) {
        const promoter = await getUserById(promoterId);
        setPromoterName(promoter?.userName || "-");
      }
      if (reviewerId) {
        const reviewer = await getUserById(reviewerId);
        setReviewerName(reviewer?.userName || "-");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSelectDiploma = (diploma) => {
    setSelectedDiploma(diploma);
    setStudentName("-");
    setPromoterName("-");
    setReviewerName("-");
    fetchUserDetails(diploma.studentId, diploma.promoterId, diploma.reviewerId);
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

          <h2>Search Diploma</h2>
          <div className="search-fields">
            <div className="search-field">
              <label>Title:</label>
              <input
                type="text"
                className="search-input"
                placeholder="Enter diploma title..."
                value={searchParams.title}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, title: e.target.value })
                }
              />
            </div>

            <div className="search-field">
              <UserSearch
                role="Student"
                label="Student - Author:"
                onSelect={(user) =>
                  setSearchParams({ ...searchParams, student: user.id })
                }
              />
            </div>
            <div className="search-field">
              <UserSearch
                role="Professor"
                label="Promoter:"
                onSelect={(user) =>
                  setSearchParams({ ...searchParams, promoter: user.id })
                }
              />
            </div>
            <div className="search-field">
              <UserSearch
                role="Professor"
                label="Reviewer:"
                onSelect={(user) =>
                  setSearchParams({ ...searchParams, reviewer: user.id })
                }
              />
            </div>
            <div className="search-field">
              <label>Status:</label>
              <input
                type="text"
                className="search-input"
                placeholder="Enter status..."
                value={searchParams.status}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, status: e.target.value })
                }
              />
            </div>
            <div className="search-field">
              <label>Tag:</label>
              <input
                type="text"
                className="search-input"
                placeholder="Enter tag..."
                value={searchParams.tag}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, tag: e.target.value })
                }
              />
            </div>
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="diplomas-table">
            <h3>List of Diplomas</h3>
            <table className="diploma-table">
              <thead>
                <tr>
                  <th>Diploma</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((diploma) => (
                  <tr
                    key={diploma.diplomaId}
                    className="diploma-table-row"
                    onClick={() => handleSelectDiploma(diploma)}
                  >
                    <td className="diploma-table-cell">{diploma.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Right Side */}
        <div className="right-pane">
          <h2>Selected Diploma</h2>
          <table className="selected-diploma-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
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
                <td>Student</td>
                <td>{studentName}</td>
              </tr>
              <tr>
                <td>Promoter</td>
                <td>{promoterName}</td>
              </tr>
              <tr>
                <td>Reviewer</td>
                <td>{reviewerName}</td>
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
