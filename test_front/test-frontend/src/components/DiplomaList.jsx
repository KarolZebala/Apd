import React from "react";
import "../styles/promoter.css";

const DiplomaList = ({
  diplomas,
  loading,
  selectedDiploma,
  onSelectDiploma,
}) => {
  return (
    <div>
      {loading ? (
        <p>Loading diplomas...</p>
      ) : diplomas.length === 0 ? (
        <p>No diplomas found.</p>
      ) : (
        <ul className="diploma-list">
          {diplomas.map((diploma) => (
            <li
              key={diploma.id}
              onClick={() => onSelectDiploma(diploma)}
              className={selectedDiploma?.id === diploma.id ? "selected" : ""}
            >
              {diploma.title} - {diploma.studentName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DiplomaList;
