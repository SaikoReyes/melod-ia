// src/App.js
import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import './App.css'; // Asegúrate de que este archivo contenga los estilos que acabamos de definir.

function App() {
  return (
    <div className="App app-container">
      <LoginForm />
    </div>
  );
}

export default App;
