import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';
import clefIcon from './images/note.png';
import axios from 'axios';
import config from './config'; 
import Popup from './PopUp';

function HistoryPage() {
    const navigate = useNavigate();
    const [historial, setHistorial] = useState([]);
    const [popupInfo, setPopupInfo] = useState({
        isOpen: false,
        title: '',
        message: ''
    });
    const token = localStorage.getItem('userToken');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios.get(`${config.API_BASE_URL}/api/get_user_history/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.length === 0) {
                
                setPopupInfo({
                    isOpen: true,
                    title: 'No tienes partituras',
                    message: 'No tienes partituras creadas.'
                });
               
                setTimeout(() => navigate('/homepage'), 2000); 
            } else {
                setHistorial(response.data);
            }
        })
        .catch(error => {
            console.error('Failed to fetch history:', error);
        });
    }, [token, navigate]); 

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    const selectPartitura = (idPartitura) => {
        localStorage.setItem('partituraId', idPartitura);
        navigate('/result');
    };

    const eliminarElemento = (idPartitura) => {
        axios.delete(`${config.API_BASE_URL}/api/delete_partitura/${idPartitura}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            
            const updatedHistorial = historial.filter(item => item.idPartitura !== idPartitura);
            setHistorial(updatedHistorial);
           
            if (updatedHistorial.length === 0) {
               
                setPopupInfo({
                    isOpen: true,
                    title: 'No tienes partituras',
                    message: 'No tienes más partituras creadas.'
                });
                setTimeout(() => navigate('/homepage'), 2000); 
            }
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
    };
    

    const closePopup = () => {
        setPopupInfo({
            isOpen: false,
            title: '',
            message: ''
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
                <a href="/history" className="nav-link">Historial</a>
            </div>
            {popupInfo.isOpen && (
                <Popup
                    isOpen={popupInfo.isOpen}
                    handleClose={closePopup}
                    title={popupInfo.title}
                    message={popupInfo.message}
                />
            )}
        </div>
    );
}

export default HistoryPage;
