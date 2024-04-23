// Popup2.js
import React from 'react';
import './PopUp2.css'; // Asegúrate de tener tus estilos aquí

function PopUp2({ title, message, onConfirm, onCancel }) {
  return (
    <div className="popup-backdrop">
      <div className="popup-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onConfirm} className="btn btn-success">Continue</button>
        <button onClick={onCancel} className="btn btn-danger">Logout</button>
      </div>
    </div>
  );
}

export default PopUp2;
