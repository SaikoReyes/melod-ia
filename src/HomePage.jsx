// Este sería un nuevo archivo, por ejemplo, `HomePage.jsx` en tu carpeta de componentes.

import React from 'react';
import './HomePage.css'; // Asegúrate de que los estilos que proporcionaste estén en este archivo.

function HomePage() {
    return (
        <div className="login-background">
            <div className="banner text-white text-center py-3">
                <h2>MELOD-IA</h2>
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-center mb-4">Ingresa el texto a musicalizar</h3>
                                <textarea className="form-control mb-3" rows="4" placeholder="Escribe aquí..."></textarea>
                                <button type="button" className="btn btn-dark w-100 mb-3">Listo</button>
                                <div className="text-center mt-3 additional-text">
                                <a href="#" className="link-dark">Historial</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
