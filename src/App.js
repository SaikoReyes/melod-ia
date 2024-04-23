// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import HistoryPage from './HistoryPage';
import ResultPage from './ResultPage';
import AuthHandler from './AuthHandler'; 
import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute><LoginForm /></ProtectedRoute>} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/homepage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
                <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
            </Routes>
            <AuthHandler /> 
        </BrowserRouter>
    );
}

export default App;
