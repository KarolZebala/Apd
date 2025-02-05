import { useState, useEffect } from "react";
import { me } from "../api/userApi";

const useUserData = () => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await me();
        setUserId(userData.id);
        setUserRole(userData.roles[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return { userId, userRole, setUserRole };
};

export default useUserData;
