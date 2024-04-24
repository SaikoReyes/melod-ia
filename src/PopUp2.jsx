
import React from 'react';
import './PopUp2.css';

function PopUp2({ title, message, onConfirm, onCancel }) {
  return (
    <div className="popup-backdrop">
      <div className="popup-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onConfirm} className="btn btn-dark">Continuar</button>
        <button onClick={onCancel} className="btn btn-dark">Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default PopUp2;
