import React from "react";
import "../styles/ReviewContentModal.css";

const ReviewContentModal = ({ reviewContent, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Review</h3>
        <p>{reviewContent}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReviewContentModal;
