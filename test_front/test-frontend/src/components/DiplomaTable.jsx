import React from "react";
import useUserData from "../hooks/useUserData";

const statusMapping = {
  Nowy: "Waiting for file upload",
  "Gotowy do recenzji": "Waiting for review",
  Zrecenzowany: "Waiting for exam assignment",
  Zakończony: "Completed",
};

const DiplomaTable = ({
  diplomas,
  loading,
  selectedDiploma,
  setSelectedDiploma,
}) => {
  const { fetchUserName, userNames } = useUserData();

  const groupedDiplomas = diplomas.reduce((acc, diploma) => {
    const status = statusMapping[diploma.status] || diploma.status || "Unknown";
    if (!acc[status]) acc[status] = [];
    acc[status].push(diploma);
    return acc;
  }, {});

  return (
    <>
      {loading ? (
        <p>Loading diplomas...</p>
      ) : (
        Object.keys(groupedDiplomas).map((status) => (
          <div key={status} className="diploma-status-group">
            <h3>{status}</h3>
            <table className="diploma-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Student</th>
                  <th>Supervisor</th>
                  <th>Reviewer</th>
                </tr>
              </thead>
              <tbody>
                {groupedDiplomas[status].map((diploma) => {
                  fetchUserName(diploma.studentId);
                  fetchUserName(diploma.promoterId);
                  fetchUserName(diploma.reviewerId);

                  return (
                    <tr
                      key={diploma.id}
                      onClick={() => setSelectedDiploma(diploma)}
                      className={
                        selectedDiploma?.id === diploma.id ? "selected" : ""
                      }
                    >
                      <td>{diploma.title}</td>
                      <td>{userNames[diploma.studentId] || "Loading..."}</td>
                      <td>{userNames[diploma.promoterId] || "Loading..."}</td>
                      <td>{userNames[diploma.reviewerId] || "Loading..."}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))
      )}
    </>
  );
};

export default DiplomaTable;
