import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
    // Estado para almacenar el texto ingresado
    const [text, setText] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto de un formulario
        // Aquí puedes pasar el texto a otro componente o función
        console.log(text); // Solo un ejemplo, probablemente quieras hacer algo más útil
    };

    return (
        <div className="login-background">
            <div className="banner">
                <h2>MELOD-IA</h2>
                <a href="#" className="nav-link">Inicio</a>
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h3 className="text-left mb-4">Ingresa el texto a musicalizar</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-body">
                                    <textarea
                                        className="form-control mb-3"
                                        rows="4"
                                        placeholder="Escribe aquí..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)} // Actualizar el estado con el texto ingresado
                                    ></textarea>
                                </div>
                            </div>
                            <div className='text-center'>
                                <button type="submit" className="btn btn-dark w-50 my-5">Listo</button>
                            </div>
                        </form>
                        <p className="text-center">
                            <a href="#" className="badge badge-light my-4">Historial</a>
                        </p>
                    </div>
                </div>
            </div>               
            <div className="footer-link fixed-bottom">
                <a href="#" className="nav-link">Inicio</a>
                <span> | Melod-IA</span>
            </div>
        </div>
    );
}

export default HomePage;
