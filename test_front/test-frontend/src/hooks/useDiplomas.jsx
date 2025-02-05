import { useState, useEffect } from "react";
import { searchDiploma } from "../api/userApi";

const useDiplomas = (userId, userRole) => {
  const [diplomas, setDiplomas] = useState([]);
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDiplomas = async (roleId) => {
    if (!userId || !userRole) return;
    setLoading(true);

    try {
      let request = { pageNumber: 1, pageSize: 10 };
      if (userRole === "Professor") {
        request[roleId === "supervision" ? "promoterIds" : "reviewerIds"] = [
          userId,
        ];
      } else if (userRole === "Student") {
        request.studentIds = [userId];
      }

      const results = await searchDiploma(request);
      setDiplomas(results || []);
    } catch (error) {
      console.error("Error fetching diplomas:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    diplomas,
    selectedDiploma,
    setSelectedDiploma,
    loading,
    fetchDiplomas,
  };
};

export default useDiplomas;
