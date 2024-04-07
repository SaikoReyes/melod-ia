import React, { useState } from 'react';
import './HistoryPage.css'; // Asegúrate de que este archivo contenga los estilos adecuados
import clefIcon from './images/note.png'; // Reemplaza esto con la ruta real al ícono de clave de sol

function HistoryPage() {
    // Suponiendo que esta sea una muestra de datos precargados que eventualmente vendrán de una BD
    const [historial, setHistorial] = useState([
        { id: 1, texto: 'Texto 1' },
        { id: 2, texto: 'Texto 2' },
        { id: 3, texto: 'Texto 3' },
    ]);

    // Función para manejar la eliminación de un elemento del historial
    const eliminarElemento = (id) => {
        console.log(`Eliminado elemento ${id}`);
        // Aquí podrías actualizar el estado para filtrar el elemento eliminado
        setHistorial(historial.filter(item => item.id !== id));
    };

    return (
        <div className="history-background">
            <div className="banner">
                <h2>MELOD-IA</h2>
                <a href="#" className="nav-link">Inicio</a>
            </div>
            <div className="container">
                <h3 className="text-white my-5">Historial</h3>
                <div className="history-list">
                    {historial.map((item, index) => (
                        <div key={item.id} className="history-item">
                            <img src={clefIcon} alt="Clave de sol" width='100px' height='100px'/>
                            <span className="history-text">{item.texto}</span>
                            <button onClick={() => eliminarElemento(item.id)} className="delete-button">🗑️</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer-link">
                <span>Melod-IA</span>
            </div>
        </div>
    );
}

export default HistoryPage;
