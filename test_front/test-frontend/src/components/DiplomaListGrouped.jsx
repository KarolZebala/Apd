import React, { useEffect, useState } from "react";
import { getUserById } from "../api/userApi";
import UploadModal from "./UploadModal"; // Nowy komponent modala

const DiplomaListGrouped = ({
  diplomas,
  loading,
  setSelectedDiploma,
  userRole,
}) => {
  const [userNames, setUserNames] = useState({});
  const [uploadDiploma, setUploadDiploma] = useState(null); // Przechowuje pracę do uploadu

  const fetchUserName = async (userId) => {
    if (!userId || userNames[userId]) return;
    try {
      const user = await getUserById(userId);
      setUserNames((prev) => ({
        ...prev,
        [userId]: user?.userName || "Unknown user",
      }));
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
    }
  };

  useEffect(() => {
    diplomas.forEach(({ studentId, promoterId, reviewerId }) => {
      fetchUserName(studentId);
      fetchUserName(promoterId);
      fetchUserName(reviewerId);
    });
  }, [diplomas]);

  const groupedDiplomas = diplomas.reduce((acc, diploma) => {
    const status = diploma.status || "Unknown";
    acc[status] = acc[status] || [];
    acc[status].push(diploma);
    return acc;
  }, {});

  return loading ? (
    <p>Loading diplomas...</p>
  ) : (
    <>
      {Object.entries(groupedDiplomas).map(([status, diplomas]) => (
        <div key={status} className="diploma-status-group">
          <h3>{status}</h3>
          <table className="diploma-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Student</th>
                <th>Supervisor</th>
                <th>Reviewer</th>
                {userRole === "Student" && status === "Nowy" && (
                  <th>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {diplomas.map((diploma) => (
                <tr
                  key={diploma.id}
                  onClick={() => setSelectedDiploma(diploma)}
                  className="clickable-row"
                >
                  <td>{diploma.title}</td>
                  <td>{userNames[diploma.studentId] || "Loading..."}</td>
                  <td>{userNames[diploma.promoterId] || "Loading..."}</td>
                  <td>{userNames[diploma.reviewerId] || "Loading..."}</td>
                  {userRole === "Student" && status === "Nowy" && (
                    <td>
                      <button onClick={() => setUploadDiploma(diploma)}>
                        Upload
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {uploadDiploma && (
        <UploadModal
          diploma={uploadDiploma}
          onClose={() => setUploadDiploma(null)}
        />
      )}
    </>
  );
};

export default DiplomaListGrouped;
