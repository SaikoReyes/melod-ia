import React, { useState, useEffect } from 'react';
import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';
import Popup from './PopUp';
import config from './config';

function SignUpPage() {

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [popupInfo, setPopupInfo] = useState({
        isOpen: false,
        title: '',
        message: ''
    });
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        matches: false
    });
    
    function passwordHasMinimumLength(password) {
        return password.length >= 7;
    }
    
    function passwordHasUppercaseLetter(password) {
        return /[A-Z]/.test(password);
    }
    
    function passwordHasLowercaseLetter(password) {
        return /[a-z]/.test(password);
    }
    
    function passwordHasNumber(password) {
        return /[0-9]/.test(password);
    }
    
    function passwordsMatch(password, confirmPassword) {
        return password === confirmPassword;
    }

    const navigate = useNavigate();

    useEffect(() => {
        setPasswordCriteria({
            minLength: passwordHasMinimumLength(contraseña),
            hasUpper: passwordHasUppercaseLetter(contraseña),
            hasLower: passwordHasLowercaseLetter(contraseña),
            hasNumber: passwordHasNumber(contraseña),
            matches: passwordsMatch(contraseña, confirmarContraseña)
        });
    }, [contraseña, confirmarContraseña]);
    
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${config.API_BASE_URL}/api/registro`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: contraseña,
                        nombre: nombre,
                        apellido: apellidos,
                        fechaNacimiento: fechaNacimiento
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    setPopupInfo({
                        isOpen: true,
                        title: "Registro Exitoso",
                        message: "Usuario registrado exitosamente"
                    });
                    setTimeout(() => {
                        navigate('/login'); 
                    }, 2000); 
                } else {
                    throw new Error(data.error || 'Error al registrar');
                }
            } catch (error) {
                setPopupInfo({
                    isOpen: true,
                    title: "Error de Registro",
                    message: error.toString()
                });
            }
        }
    };
    
    const closePopup = () => {
        if (popupInfo.title === "Registro exitoso") {
            navigate('/login'); 
        }
        setPopupInfo({
            isOpen: false,
            title: '',
            message: ''
        });
    };

    const validateForm = () => {
        
        if (!nombre || nombre.length < 1) {
            setPopupInfo({
                isOpen: true,
                title: "Error en el formulario",
                message: "El nombre debe tener al menos 1 caracter."
            });
            return false;
        }
    
        
        if (!apellidos || apellidos.length < 1) {
            setPopupInfo({
                isOpen: true,
                title: "Error en el formulario",
                message: "Los apellidos deben tener al menos 1 caracter."
            });
            return false;
        }
    
        
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setPopupInfo({
                isOpen: true,
                title: "Error en el formulario",
                message: "Por favor, introduce un correo electrónico válido."
            });
            return false;
        }
    
        
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
        if (!fechaNacimiento || new Date(fechaNacimiento) >= today || new Date(fechaNacimiento) > minDate) {
            setPopupInfo({
                isOpen: true,
                title: "Error en el formulario",
                message: "La fecha de nacimiento no es válida."
            });
            return false;
        }

        
    
        
        if (!contraseña || contraseña.length < 7 || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/.test(contraseña)) {
            setPopupInfo({
                isOpen: true,
                title: "Error en el formulario",
                message: "La contraseña debe tener al menos 7 caracteres, incluyendo un número, una letra mayúscula y una minúscula."
            });
            return false; 
        }
    
        
        if (contraseña !== confirmarContraseña) {
            setPopupInfo({
                isOpen: true,
                title: "Error en el formulario",
                message: "Las contraseñas no coinciden."
            });
            return false;
        }

        
        
    
        
        return true;
    };

    return (
        <div className="signup-background">
            <div className="banner">
                <h2>MELOD-IA</h2>
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12 mx-auto">
                        <form className="signup-form" onSubmit={handleSubmit}>
                            <h2 className="text-white">Ingresa tus datos</h2>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    Nombre
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        value={nombre}
                                        onChange={e => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    Apellidos
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Apellidos"
                                        value={apellidos}
                                        onChange={e => setApellidos(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    Correo electrónico
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Correo electrónico"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    Fecha de nacimiento
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Fecha de nacimiento"
                                        value={fechaNacimiento}
                                        onChange={e => setFechaNacimiento(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                Contraseña
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    value={contraseña}
                                    onChange={e => setContraseña(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                Confirmar Contraseña
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirmar Contraseña"
                                    value={confirmarContraseña}
                                    onChange={e => setConfirmarContraseña(e.target.value)}
                                />
                            </div>
                            <div className="password-criteria-box">                                
                                <ul>
                                    <li style={{ color: passwordCriteria.minLength ? 'green' : 'red' }}>La contraseña contiene al menos 7 caracteres</li>
                                    <li style={{ color: passwordCriteria.hasUpper ? 'green' : 'red' }}>La contraseña contiene una letra mayúscula</li>
                                    <li style={{ color: passwordCriteria.hasLower ? 'green' : 'red' }}>La contraseña contiene una letra minúscula</li>
                                    <li style={{ color: passwordCriteria.hasNumber ? 'green' : 'red' }}>La contraseña contiene un número</li>
                                    <li style={{ color: passwordCriteria.matches ? 'green' : 'red' }}>Las contraseñas coinciden</li>
                                </ul>
                            </div>

                            <button type="submit" className="btn btn-dark w-100 my-4">Crear cuenta</button>
                        </form>
                    </div>
                </div>
            </div>
            <Popup
                isOpen={popupInfo.isOpen}
                handleClose={closePopup}
                title={popupInfo.title}
                message={popupInfo.message}
            />
        </div>
    );
}

export default SignUpPage;
