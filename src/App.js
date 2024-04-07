// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Corrección aquí
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter> {/* Corrección aquí */}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
