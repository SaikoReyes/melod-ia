import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Popup from './PopUp'; 

function HomePage() {
    const [text, setText] = useState('');
    const [popupInfo, setPopupInfo] = useState({
        isOpen: false,
        title: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateText = () => {
        const words = text.trim().split(/\s+/);
        if (!text.trim() || words.length < 5) {
            setPopupInfo({
                isOpen: true,
                title: 'Error en el texto',
                message: 'Texto inválido'
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateText()) {
            setLoading(true);
            setPopupInfo({
                isOpen: true,
                title: 'Procesando',
                message: 'Tu texto está siendo procesado...'
            });
            setTimeout(() => {
                setLoading(false);
                navigate('/result');
            }, 5000); 
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
            <div className="banner">
                <h2>MELOD-IA</h2>
                <a href="/homepage" className="nav-link">Inicio</a>
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
                                        onChange={(e) => setText(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className='text-center'>
                                <button type="submit" className="btn btn-dark w-50 my-5">Listo</button>
                            </div>
                        </form>
                        <p className="text-center">
                            <a href="/history" className="badge badge-light my-4">Historial</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer-link fixed-bottom">
                <a href="/homepage" className="nav-link">Inicio</a>
                <span> | Melod-IA</span>
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

export default HomePage;
