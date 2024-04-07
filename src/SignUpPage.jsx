import React from 'react';
import './SignUpPage.css'; // Asegúrate de que este archivo contenga los estilos adecuados

function SignUpPage() {
    return (
        <div className="signup-background">
            <div className="banner">
                <h2>MELOD-IA</h2>
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12 mx-auto">
                        <h2 className="text-white">Ingresa tus datos</h2>
                        <form className="signup-form">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    Nombre
                                    <input type="text" className="form-control" placeholder="Nombre" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    Apellidos
                                    <input type="text" className="form-control" placeholder="Apellidos" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    Correo electrónico
                                    <input type="email" className="form-control" placeholder="Correo electrónico" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    Fecha de nacimiento
                                    <input type="date" className="form-control" placeholder="Fecha de nacimiento" />
                                </div>
                            </div>
                            <div className="mb-3">
                                Contraseña
                                <input type="password" className="form-control" placeholder="Contraseña" />
                            </div>
                            <button type="submit" className="btn btn-dark w-100">Crear cuenta</button>
                        </form>
                            <div className="footer-link">
                                <span>Melod-IA</span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
