import React from "react";

const DiplomaActions = ({
  userRole,
  onSearch,
  onAddDiploma,
  fetchDiplomas,
  userId,
}) => {
  return (
    <div className="diploma-actions">
      {userRole === "Professor" ? (
        <>
          <button className="add-diploma-button" onClick={onAddDiploma}>
            Add Diploma
          </button>
          <button className="search-button" onClick={onSearch}>
            Search Diplomas
          </button>
        </>
      ) : userRole === "Student" ? (
        <>
          <button className="search-button" onClick={onSearch}>
            Search Diplomas
          </button>
          <button
            className="search-button"
            onClick={() => fetchDiplomas("student", userId, userRole)}
          >
            My Diploma
          </button>
        </>
      ) : null}
    </div>
  );
};

export default DiplomaActions;

