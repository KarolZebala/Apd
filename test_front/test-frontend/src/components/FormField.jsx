import React from "react";
import "../styles/formfield.css";

const FormField = ({ label, type, value, onChange, error }) => {
  return (
    <div className="form-field">
      <label className="form-field-label">{label}</label>
      <input
        className={`form-field-input ${error ? "form-field-error" : ""}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <p id={`${label}-error`} className="form-field-error-message">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
