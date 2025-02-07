import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchDiploma } from "../api/userApi";
import UserSearch from "../components/UserSearch";
import DiplomaDetails from "../components/DiplomaDetails";
import "../styles/search.css";

const DiplomaSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    title: "",
    student: "",
    promoter: "",
    reviewer: "",
    status: "",
    tag: "",
  });

  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const navigate = useNavigate();

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

  const handleSelectDiploma = (diploma) => {
    setSelectedDiploma(diploma);
  };

  return (
    <div className="search-page">
      <h1>Search Diplomas</h1>

      <div className="search-fields">
        <input
          type="text"
          placeholder="Title..."
          value={searchParams.title}
          onChange={(e) =>
            setSearchParams({ ...searchParams, title: e.target.value })
          }
        />
        <UserSearch
          role="Student"
          label="Student:"
          onSelect={(user) =>
            setSearchParams({ ...searchParams, student: user.id })
          }
        />
        <UserSearch
          role="Professor"
          label="Promoter:"
          onSelect={(user) =>
            setSearchParams({ ...searchParams, promoter: user.id })
          }
        />
        <UserSearch
          role="Professor"
          label="Reviewer:"
          onSelect={(user) =>
            setSearchParams({ ...searchParams, reviewer: user.id })
          }
        />
        <input
          type="text"
          placeholder="Status..."
          value={searchParams.status}
          onChange={(e) =>
            setSearchParams({ ...searchParams, status: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Tag..."
          value={searchParams.tag}
          onChange={(e) =>
            setSearchParams({ ...searchParams, tag: e.target.value })
          }
        />
        <button onClick={handleSearch}>Search</button>
      </div>

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
              onClick={() => handleSelectDiploma(diploma)}
            >
              <td>{diploma.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Selected Diploma</h2>
      <DiplomaDetails diploma={selectedDiploma} />

      {/* New przycisk "Cofnij" */}
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
    </div>
  );
};

export default DiplomaSearch;
