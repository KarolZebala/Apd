import React from "react";

const RoleSwitcher = ({ viewMode, onChangeViewMode }) => {
  return (
    <div className="right-pane-header">
      <button
        className={`supervision-button ${
          viewMode === "supervision" ? "active" : ""
        }`}
        onClick={() => onChangeViewMode("supervision")}
      >
        Supervision
      </button>
      <button
        className={`review-button ${viewMode === "review" ? "active" : ""}`}
        onClick={() => onChangeViewMode("review")}
      >
        Review
      </button>
    </div>
  );
};

export default RoleSwitcher;
