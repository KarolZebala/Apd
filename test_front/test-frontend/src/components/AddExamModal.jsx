import React, { useState } from "react";
import { addExam } from "../api/userApi";

const AddExamModal = ({ diploma, onClose }) => {
  const [examDate, setExamDate] = useState("");
  const [score, setScore] = useState(2); // Domyślna ocena: 2
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async () => {
    if (!examDate) {
      setError("Please select an exam date!");
      return;
    }

    setLoading(true);
    setIsLocked(true);

    try {
      await addExam(diploma.diplomaId, new Date(examDate).toISOString(), score); // Przekazanie wybranego score

      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 3000);
    } catch (error) {
      setError("Failed to add exam. Try again.");
      setIsLocked(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      {isSuccess && (
        <div className="success-message-overlay">
          <p>Exam created successfully!</p>
        </div>
      )}
      {isLocked && <div className="interaction-blocker"></div>}

      <div className="modal-container">
        <h2>Add Exam for diploma: {diploma.title}</h2>

        {/* Pole wyboru daty egzaminu */}
        <div className="form-field">
          <label>Exam Date*:</label>
          <input
            type="datetime-local"
            name="examDate"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            disabled={isLocked}
            className="large-input"
          />
        </div>

        {/* Radio buttony do wyboru oceny */}
        <div className="form-field">
          <label>Grade*:</label>
          <div className="radio-group">
            {[2, 3, 4, 5].map((value) => (
              <label key={value} className="radio-label">
                <input
                  type="radio"
                  name="score"
                  value={value}
                  checked={score === value}
                  onChange={() => setScore(value)}
                  disabled={isLocked}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        {/* Przyciski akcji */}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose} disabled={isLocked}>
            Cancel
          </button>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading || isLocked}
          >
            {loading ? "Submitting..." : "Submit Exam"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExamModal;
