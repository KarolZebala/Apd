import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchDiploma,
  getUserIdByUsernameAndRole,
  updateDiploma,
} from "../api/userApi"; // Dodano updateDiploma
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserSearch from "../components/UserSearch";
import { jwtDecode } from "jwt-decode";
import "../styles/student.css";

const StudentPage = ({ onLogout }) => {
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const [userDiplomas, setUserDiplomas] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [searchParams, setSearchParams] = useState({
    student: "",
    promoter: "",
    reviewer: "",
    status: "",
  });

  // Nowe stany dla pliku i tagów
  const [pdfFile, setPdfFile] = useState(null);
  const [tags, setTags] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const extractedUsername =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ] || "Unknown User";
        const role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] || "Student";

        setUsername(extractedUsername);
        fetchUserIdByUsernameAndRole(extractedUsername, role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const fetchUserIdByUsernameAndRole = async (username, role) => {
    try {
      const user = await getUserIdByUsernameAndRole(username, role);
      if (user) {
        setUserId(user);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  useEffect(() => {
    const fetchUserDiplomas = async () => {
      try {
        if (!userId) {
          return;
        }

        const request = {
          studentIds: [userId],
          pageNumber: 1,
          pageSize: 10,
        };

        const results = await searchDiploma(request);
        setUserDiplomas(results || []);
      } catch (error) {
        console.error("Error fetching user diplomas:", error);
      }
    };

    fetchUserDiplomas();
  }, [userId]);

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

  // Nowa funkcja do aktualizacji pracy dyplomowej
  const handleUpdateDiploma = async () => {
    if (!pdfFile || pdfFile.size > 50 * 1024 * 1024) {
      alert("Please upload a PDF file smaller than 50MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64File = reader.result.split(",")[1]; // Usuń nagłówek base64

      const request = {
        diplomaId: selectedDiploma.diplomaId,
        description: selectedDiploma.description,
        attachments: [
          {
            title: pdfFile.name,
            size: pdfFile.size,
            extension: ".pdf",
            data: base64File,
          },
        ],
        tags: tags.split(",").map((tag) => ({ name: tag.trim() })),
      };

      try {
        await updateDiploma(request);
        alert("Diploma updated successfully!");
      } catch (error) {
        console.error("Error updating diploma:", error);
        alert("Failed to update diploma.");
      }
    };

    reader.readAsDataURL(pdfFile); // Konwertowanie pliku na Base64
  };

  return (
    <div className="student-page">
      <Header username={username} onLogout={onLogout} />
      <h1>Thesis Archive</h1>

      <div className="content-container">
        {/* Left Panel */}
        <div className="left-pane">
          <h2>Your Theses</h2>

          <div className="diplomas-table">
            <h3>List of Your Theses</h3>
            <table className="diploma-table">
              <thead>
                <tr>
                  <th>Thesis</th>
                </tr>
              </thead>
              <tbody>
                {userDiplomas.map((diploma) => (
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

          <h2>Search Thesis</h2>
          <div className="search-fields">
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
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="diplomas-table">
            <h3>Search Results</h3>
            <table className="diploma-table">
              <thead>
                <tr>
                  <th>Thesis</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.length > 0 ? (
                  searchResults.map((diploma) => (
                    <tr
                      key={diploma.diplomaId}
                      className="diploma-table-row"
                      onClick={() => setSelectedDiploma(diploma)}
                    >
                      <td className="diploma-table-cell">{diploma.title}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="1" className="no-results">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-pane">
          <h2>Selected Thesis</h2>
          <table className="selected-diploma-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Thesis ID</td>
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
            </tbody>
          </table>

          {/* Sekcja dodawania pliku i tagów dla statusu "New" */}
          {selectedDiploma?.status === "New" && (
            <div className="upload-section">
              <h3>Upload PDF and Add Tags</h3>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
              />
              <input
                type="text"
                placeholder="Enter tags separated by commas"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <button onClick={handleUpdateDiploma}>Submit</button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentPage;
