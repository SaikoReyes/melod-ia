import React, { useState } from 'react';
import './LoginForm.css'; // Ajusta la ruta según sea necesario

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Manejo del envío del formulario
        console.log(username, password);
    };

    return (
        <div className="login-background"> 
            <div className="container-fluid p-0">
                <div className="banner text-white py-2 mb-5">
                    <h2 className="text-center">MELOD-IA</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h3 className="text-center mb-4">Iniciar sesión</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Ingresa tu usuario"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
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
                                    <div className="text-center mt-3"><a>¿Aún no tienes una cuenta? </a>
                                        <a href="#" className="link-dark">Registrate</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
