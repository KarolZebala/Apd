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
    setQuery(user.userName || "");
    setShowDropdown(false);
    onSelect(user);
  };

  return (
    <div className="relative w-full max-w-md">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoComplete="off"
      />
      {showDropdown && results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {results.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSelect(user)}
              className="p-2 cursor-pointer hover:bg-blue-100"
            >
              {user.userName || "Unknown"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearch;
