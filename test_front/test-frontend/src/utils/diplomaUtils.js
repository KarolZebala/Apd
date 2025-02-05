import { searchDiploma, getUserIdByUsernameAndRole } from "../api/userApi";
import { jwtDecode } from "jwt-decode";

// Function to fetch user ID based on username and role
export const fetchUserIdByUsernameAndRole = async (
  username,
  role,
  setUserId
) => {
  try {
    const user = await getUserIdByUsernameAndRole(username, role);
    if (user) {
      setUserId(user);
    }
  } catch (error) {
    console.error("Error fetching user ID:", error);
  }
};

// Function to fetch diplomas based on user ID
export const fetchUserDiplomas = async (userId, setUserDiplomas) => {
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

// Function to decode JWT token and extract user data
export const decodeJwtAndSetUser = (token, setUsername, setUserId) => {
  try {
    const decoded = jwtDecode(token);
    const extractedUsername =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      "Unknown User";
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      "Student";

    setUsername(extractedUsername);
    fetchUserIdByUsernameAndRole(extractedUsername, role, setUserId);
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};
