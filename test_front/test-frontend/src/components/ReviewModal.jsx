import React, { useState } from "react";
import { addDiplomaReview } from "../api/userApi";

const ReviewModal = ({ diploma, reviewerId, onClose }) => {
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!reviewText.trim()) {
      setError("Review cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      await addDiplomaReview(diploma.diplomaId, reviewerId, reviewText);
      alert("Review added successfully!");
      onClose();
    } catch (error) {
      setError("Failed to add review. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add Review for: {diploma.title}</h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          rows="8"
        />
        {error && <p className="error">{error}</p>}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
