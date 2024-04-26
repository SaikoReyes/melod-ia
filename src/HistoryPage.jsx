import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';
import clefIcon from './images/note.png';
import axios from 'axios';

function HistoryPage() {
    const navigate = useNavigate();
    const [historial, setHistorial] = useState([]);
    const token = localStorage.getItem('userToken'); 

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios.get(`http://127.0.0.1:8000/get_user_history/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setHistorial(response.data);
        })
        .catch(error => {
            console.error('Failed to fetch history:', error);
        });
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    const selectPartitura = (idPartitura) => {
        localStorage.setItem('partituraId', idPartitura); 
        navigate('/result'); 
    };

    const eliminarElemento = (idPartitura) => {
        axios.delete(`http://127.0.0.1:8000/delete_partitura/${idPartitura}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            setHistorial(historial.filter(item => item.idPartitura !== idPartitura));
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
    };

    return (
        <div className="history-background">
            <div className="banner">
                <h2>MELOD-IA</h2>
                <button className="nav-link" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <div className="container">
                <h3 className="text-white my-5">Historial</h3>
                <div className="history-list">
                    {historial.map(item => (
                        <div key={item.idPartitura} className="history-item">
                            <img src={clefIcon} alt="Clave de sol" width='100px' height='100px'/>
                            <span className="history-text" onClick={() => selectPartitura(item.idPartitura)}>{item.texto}</span>
                            <button onClick={() => eliminarElemento(item.idPartitura)} className="delete-button">🗑️</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer-link fixed-bottom">
                <a href="/homepage" className="nav-link">Inicio</a>
                
                <span>Melod-IA</span>
                
            </div>
        </div>
    );
}

export default HistoryPage;
