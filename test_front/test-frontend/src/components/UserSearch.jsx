import React, { useState, useEffect } from "react";
import { searchUsers } from "../api/userApi";

const UserSearch = ({ role, label, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      const fetchUsers = async () => {
        try {
          const users = await searchUsers(query, role);
          console.log("Zwróceni użytkownicy:", users); // Debugowanie
          setResults(users || []);
          setShowDropdown(true);
        } catch (error) {
          console.error("Błąd przy pobieraniu użytkowników:", error);
          setResults([]);
          setShowDropdown(false);
        }
      };
      fetchUsers();
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query, role]);

  const handleSelect = (user) => {
    setQuery(user.userName || ""); // Ustawiamy `userName` jako wybraną wartość
    setShowDropdown(false);
    onSelect(user);
  };

  return (
    <div className="user-search">
      <label>{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      {showDropdown && results.length > 0 && (
        <ul className="dropdown">
          {results.map((user) => (
            <li key={user.id} onClick={() => handleSelect(user)}>
              {user.userName || "Unknown"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearch;
