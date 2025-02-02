import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/userApi";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // Lock everything
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required.";
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.password) errors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords must match.";
    return errors;
  };

  const isFormValid = () => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsLoading(true);

    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );
      setIsSuccess(true);
      setIsLocked(true); // Lock everything
      setTimeout(() => {
        setIsLocked(false); // Unlock after 3 seconds
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (err.errors) {
        const backendErrors = err.errors.reduce((acc, error, index) => {
          acc[`backendError${index}`] = error;
          return acc;
        }, {});
        setFormErrors(backendErrors);
      } else {
        setFormErrors({ general: "Failed to register." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`register-page ${isSuccess ? "dimmed" : ""}`}>
      {isSuccess && (
        <div className="success-message-overlay">
          <p>Registration successful!</p>
        </div>
      )}
      {/* Overlay to block interactions */}
      {isLocked && <div className="interaction-blocker"></div>}

      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <div className="form-field">
          <label className="form-field-label">Username:</label>
          <input
            type="text"
            className="form-field-input"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            disabled={isLocked}
          />
          {formErrors.username && (
            <p className="form-field-error-message">{formErrors.username}</p>
          )}
        </div>
        <div className="form-field">
          <label className="form-field-label">Email:</label>
          <input
            type="email"
            className="form-field-input"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isLocked}
          />
          {formErrors.email && (
            <p className="form-field-error-message">{formErrors.email}</p>
          )}
        </div>
        <div className="form-field">
          <label className="form-field-label">Password:</label>
          <input
            type="password"
            className="form-field-input"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isLocked}
          />
          {formErrors.password && (
            <p className="form-field-error-message">{formErrors.password}</p>
          )}
        </div>
        <div className="form-field">
          <label className="form-field-label">Confirm Password:</label>
          <input
            type="password"
            className="form-field-input"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            disabled={isLocked}
          />
          {formErrors.confirmPassword && (
            <p className="form-field-error-message">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>
        <div className="form-field">
          <label className="form-field-label">Role:</label>
          <select
            className="form-field-input"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            disabled={isLocked}
          >
            <option value="Student">Student</option>
            <option value="Professor">Professor</option>
          </select>
        </div>
        <button
          className="register-button"
          onClick={handleRegister}
          disabled={!isFormValid() || isLoading || isLocked}
        >
          {isLoading ? "Registering..." : "Create Account"}
        </button>
        {Object.keys(formErrors)
          .filter((key) => key.startsWith("backendError"))
          .map((key) => (
            <p key={key} className="form-field-error-message">
              {formErrors[key]}
            </p>
          ))}
        <button
          className="register-button"
          onClick={() => navigate("/login")}
          disabled={isLocked}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
