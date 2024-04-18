import React from 'react';
import './Popup.css';
function Popup({ isOpen, handleClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={handleClose} className="btn btn-dark">Aceptar</button>
      </div>
    </div>
  );
}

export default Popup;
