import React, { useState } from 'react';
import './SignUpPage.css';

function SignUpPage() {
    // Estados para almacenar los valores de cada campo de entrada
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [contraseña, setContraseña] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes pasar los datos a otro componente o función para la validación
        console.log({
            nombre,
            apellidos,
            email,
            fechaNacimiento,
            contraseña,
        });
        // Por ejemplo, podrías enviar estos datos a un backend o una API
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
                            <div className="mb-3 ">
                                Contraseña
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    value={contraseña}
                                    onChange={e => setContraseña(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark w-100 my-4">Crear cuenta</button>
                        </form>
                        <div className="footer-link fixed-bottom">
                            <span>Melod-IA</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
