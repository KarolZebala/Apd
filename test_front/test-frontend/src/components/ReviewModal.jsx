import React, { useState } from "react";
import { addDiplomaReview } from "../api/userApi";

const ReviewModal = ({ diploma, reviewerId, onClose }) => {
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async () => {
    if (!reviewText.trim()) {
      setError("Review cannot be empty!");
      return;
    }

    setLoading(true);
    setIsLocked(true);

    try {
      await addDiplomaReview(diploma.diplomaId, reviewerId, reviewText);
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 3000);
    } catch (error) {
      setError("Failed to add review. Try again.");
      setIsLocked(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      {isSuccess && (
        <div className="success-message-overlay">
          <p>Review submitted successfully!</p>
        </div>
      )}
      {isLocked && <div className="interaction-blocker"></div>}

      <div className="modal-container">
        <h2>Add Review for: {diploma.title}</h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          rows="8"
          disabled={isLocked}
        />
        {error && <p className="error">{error}</p>}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose} disabled={isLocked}>
            Cancel
          </button>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading || isLocked}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
