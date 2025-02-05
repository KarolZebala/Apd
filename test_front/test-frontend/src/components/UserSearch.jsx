import React, { useState, useEffect, useRef } from "react";
import { searchUsers } from "../api/userApi";

const UserSearch = ({ role, label, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="large-input" /* Użycie istniejącej klasy */
        autoComplete="off"
      />
      {showDropdown && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="suggestions-popup absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50"
        >
          <ul className="max-h-48 overflow-y-auto">
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
        </div>
      )}
    </div>
  );
};

export default UserSearch;
