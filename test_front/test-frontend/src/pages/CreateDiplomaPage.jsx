// CreateDiplomaPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDiploma } from "../api/userApi";
import Header from "../components/Header";
// import "../styles/create-diploma.css";

const CreateDiplomaPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    departmentName: "",
    course: "",
    createDate: "",
    studentId: "",
    promoterId: "",
    reviewerId: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required.";
    if (!formData.studentId) errors.studentId = "Student ID is required.";
    if (!formData.promoterId) errors.promoterId = "Promoter ID is required.";
    if (!formData.reviewerId) errors.reviewerId = "Reviewer ID is required.";
    if (!formData.createDate || isNaN(Date.parse(formData.createDate))) {
      errors.createDate = "Valid Create Date is required.";
    }
    return errors;
  };

  const isFormValid = () => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsLoading(true);
  
    try {
      // Dopasowanie danych do struktury oczekiwanej przez backend
      const requestData = {
        title: formData.title,
        type: formData.type,
        departmentName: formData.departmentName,
        course: formData.course,
        createDate: new Date(formData.createDate).toISOString(),
        studentId: formData.studentId,
        promoterId: formData.promoterId,
        reviewerId: formData.reviewerId,
      };
  
      // Wywołanie funkcji API z poprawną strukturą danych
      await createDiploma(requestData);
  
      setIsSuccess(true);
      setIsLocked(true);
      setTimeout(() => {
        setIsLocked(false);
        navigate("/promoter");
      }, 3000);
    } catch (err) {
      setFormErrors({
        general: err.response?.data?.title || "Failed to create diploma.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`create-diploma-page ${isSuccess ? "dimmed" : ""}`}>
      {isSuccess && (
        <div className="success-message-overlay">
          <p>Diploma created successfully!</p>
        </div>
      )}
      {isLocked && <div className="interaction-blocker"></div>}

      <Header />
      <div className="form-container">
        <h1>Create Diploma</h1>

        <form>
          <div className="form-field">
            <label>Title*:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={isLocked}
              className="large-input"
            />
            {formErrors.title && <p className="form-field-error-message">{formErrors.title}</p>}
          </div>

          <div className="form-field">
            <label>Type:</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              disabled={isLocked}
              className="large-input"
            />
          </div>

          <div className="form-field">
            <label>Department Name:</label>
            <input
              type="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
              disabled={isLocked}
              className="large-input"
            />
          </div>

          <div className="form-field">
            <label>Course:</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              disabled={isLocked}
              className="large-input"
            />
          </div>

          <div className="form-field">
            <label>Create Date:</label>
            <input
              type="datetime-local"
              name="createDate"
              value={formData.createDate}
              onChange={(e) => setFormData({ ...formData, createDate: e.target.value })}
              disabled={isLocked}
              className="large-input"
            />
            {formErrors.createDate && <p className="form-field-error-message">{formErrors.createDate}</p>}
          </div>

          <div className="form-field">
            <label>Student ID*:</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              disabled={isLocked}
              className="large-input"
            />
            {formErrors.studentId && <p className="form-field-error-message">{formErrors.studentId}</p>}
          </div>

          <div className="form-field">
            <label>Promoter ID*:</label>
            <input
              type="text"
              name="promoterId"
              value={formData.promoterId}
              onChange={(e) => setFormData({ ...formData, promoterId: e.target.value })}
              disabled={isLocked}
              className="large-input"
            />
            {formErrors.promoterId && <p className="form-field-error-message">{formErrors.promoterId}</p>}
          </div>

          <div className="form-field">
            <label>Reviewer ID*:</label>
            <input
              type="text"
              name="reviewerId"
              value={formData.reviewerId}
              onChange={(e) => setFormData({ ...formData, reviewerId: e.target.value })}
              disabled={isLocked}
              className="large-input"
            />
            {formErrors.reviewerId && <p className="form-field-error-message">{formErrors.reviewerId}</p>}
          </div>

          {formErrors.general && <p className="form-field-error-message">{formErrors.general}</p>}

          <button
            type="button"
            onClick={handleCreate}
            disabled={!isFormValid() || isLoading || isLocked}
            className="create-button"
          >
            {isLoading ? "Creating..." : "Create Diploma"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/promoter")}
            disabled={isLocked}
            className="cancel-button"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDiplomaPage;
