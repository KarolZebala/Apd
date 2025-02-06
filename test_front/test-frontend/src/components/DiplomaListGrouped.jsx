import React, { useEffect, useState } from "react";
import {
  getUserById,
  downloadDiploma,
  me,
} from "../api/userApi";
import UploadModal from "./UploadModal";
import ReviewModal from "./ReviewModal";
import AddExamModal from "./AddExamModal"; // Import nowego modalu

const DiplomaListGrouped = ({
  diplomas,
  loading,
  setSelectedDiploma,
  userRole,
}) => {
  const [userNames, setUserNames] = useState({});
  const [uploadDiploma, setUploadDiploma] = useState(null);
  const [reviewDiploma, setReviewDiploma] = useState(null);
  const [examDiploma, setExamDiploma] = useState(null); // Nowy stan dla egzaminu
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    // Pobierz ID aktualnie zalogowanego użytkownika
    const fetchCurrentUser = async () => {
      try {
        const user = await me();
        setLoggedInUserId(user.id);
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

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
                <th>Actions</th>
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
                  <td>
                    {userRole === "Student" && status === "Nowy" && (
                      <button onClick={() => setUploadDiploma(diploma)}>
                        Upload
                      </button>
                    )}
                    {["Professor", "Student"].includes(userRole) &&
                      status !== "Nowy" && (
                        <button
                          onClick={() => downloadDiploma(diploma.diplomaId)}
                        >
                          Download
                        </button>
                      )}
                    {/* Przycisk Add Review tylko dla przypisanego recenzenta */}
                    {userRole === "Professor" &&
                      diploma.reviewerId === loggedInUserId &&
                      status === "Gotowy do recenzji" && (
                        <button onClick={() => setReviewDiploma(diploma)}>
                          Add Review
                        </button>
                      )}
                    
                    {/* Przycisk Add Exam tylko dla przypisanego promotora */}
                    {userRole === "Professor" &&
                      diploma.promoterId === loggedInUserId &&
                      status === "Zrecenzowany" && (
                        <button onClick={() => setExamDiploma(diploma)}>
                          Add Exam
                        </button>
                      )}
                  </td>
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
      {reviewDiploma && (
        <ReviewModal
          diploma={reviewDiploma}
          reviewerId={loggedInUserId}
          onClose={() => setReviewDiploma(null)}
        />
      )}
      {examDiploma && (
        <AddExamModal
          diploma={examDiploma}
          onClose={() => setExamDiploma(null)}
        />
      )}
    </>
  );
};

export default DiplomaListGrouped;
