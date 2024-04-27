import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Popup from './PopUp';  
import config from './config';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [popupInfo, setPopupInfo] = useState({
        isOpen: false,
        title: '',
        message: ''
    });

    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !password) {
            setPopupInfo({
                isOpen: true,
                title: "Error en el formulario",
                message: "Usuario y contraseña no pueden estar vacíos."
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    if (validateForm()) {
        try {
            const response = await fetch(`${config.API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password })
            });
            const data = await response.json();
            if (response.ok) {
                
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userId', data.idUsuario);
                setPopupInfo({
                    isOpen: true,
                    title: "Bienvenido",
                    message: `¡Bienvenido ${data.nombre}!`
                });
                setTimeout(() => {
                    navigate('/HomePage'); 
                }, 2000); 
            } else {
                throw new Error(data.error || 'Usuario o contraseña incorrectos');
            }
        } catch (error) {
            setPopupInfo({
                isOpen: true,
                title: "Error de Autenticación",
                message: error.toString()
            });
        }
    }
    };

    const closePopup = () => {
        setPopupInfo({
            isOpen: false,
            title: '',
            message: ''
        });
    };

    return (
        <div className="login-background"> 
            <div className="container-fluid p-0">
                <div className="banner text-white py-2 mb-5">
                    <h2 className="text-center">MELOD-IA</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                    <h3 className="text-left mb-4">Inicia sesión</h3>
                        <div className="card shadow-lg">
                            <div className="card-body">
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Ingresa tu usuario"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Ingresa tu contraseña"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-dark w-100">Ingresar</button>
                                    <div className="form-label mt-3"><a>¿Aún no tienes una cuenta? </a>
                                        <a href="/SignUp" className="link-dark">Registrate</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-link">
                    <span>Melod-IA</span>
                </div>
                <Popup
                isOpen={popupInfo.isOpen}
                handleClose={closePopup}
                title={popupInfo.title}
                message={popupInfo.message}
            />
            </div>
        </div>
    );
}

export default LoginForm;
