// CommonModal.jsx
import React from "react";
import PropTypes from "prop-types";
import "./CommonModal.css";

const CommonModal = ({ isOpen, onClose, title, message, children }) => {
  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>
        <div className="modal-body">
          {message && <p>{message}</p>}
          {children}
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

// Define the prop types for validation
CommonModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
};

export default CommonModal;
