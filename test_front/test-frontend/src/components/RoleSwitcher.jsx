import React from "react";

const RoleSwitcher = ({ viewMode, onChangeViewMode }) => {
  return (
    <div className="role-switcher">
      <button
        className="supervision-button"
        onClick={() => onChangeViewMode("supervision")}
      >
        Supervision
      </button>
      <button
        className="review-button"
        onClick={() => onChangeViewMode("review")}
      >
        Review
      </button>
    </div>
  );
};

export default RoleSwitcher;