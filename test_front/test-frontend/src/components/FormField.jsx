// src/components/FormField.jsx
import React from 'react';
import '../styles/formfield.css';

const FormField = ({ label, type, value, onChange }) => {
  return (
    <div className="form-field">
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
      />
    </div>
  );
};

export default FormField;