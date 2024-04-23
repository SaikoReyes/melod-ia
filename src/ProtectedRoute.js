// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    // Opcional: Agregar aquí una verificación más detallada del token

    if (!token) {
        // Redirecciona al login si no hay token
        return <Navigate to="/login" replace />;
    }

    return children; // Muestra el componente hijo si hay token
};

export default ProtectedRoute;
