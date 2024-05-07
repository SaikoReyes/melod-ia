import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Popup from './PopUp'; 
import axios from 'axios';
import config from './config';


function HomePage() {
    const [text, setText] = useState('');
    const [popupInfo, setPopupInfo] = useState({
        isOpen: false,
        title: '',
        message: ''
    });
    const [setLoading] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    const navigate = useNavigate();
    
    function countSyllables(text) {
        const cleanedText = text.toLowerCase().replace(/[^aáeéiíoóuúüñ.,;!? ]+/g, " ").trim();
        const words = cleanedText.split(/\s+/);
        let syllableCount = 0;
        for (const word of words) {
            syllableCount += word.replace(/[^aeiouáéíóúüñ]{2,}/g, 'x') 
                                .replace(/e[aeiouáéíóúñ]/gi, 'ea') 
                                .split(/[^aeiouáéíóúüñ]+/).length; 
        }
        return syllableCount;
    }
    
    function validateText(text) {
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ .,;!¡¿?-]+$/.test(text)) {
            return { valid: false, message: 'El texto ingresado contiene caracteres no permitidos.' };
        }
    
        const syllableCount = countSyllables(text);
        if (syllableCount < config.SILABAS_MINIMAS) {
            return { valid: false, message: `El texto debe contener al menos ${config.SILABAS_MINIMAS} sílabas.` };
        }
        return { valid: true, message: '' };
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const { valid, message } = validateText(text);
        if (!valid) {
            setPopupInfo({
                isOpen: true,
                title: 'Texto inválido',
                message: message
            });
            return;
        }
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            setPopupInfo({
                isOpen: true,
                title: 'No autorizado',
                message: 'No se encontró token de usuario. Por favor, inicie sesión.'
            });
            return;
        }
        setLoading(true);
        axios.post(`${config.API_BASE_URL}/api/generate_xml`, {
            text: text,
            user_id: localStorage.getItem('userId')
        }, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            localStorage.setItem('partituraId', response.data.partitura_id);
            navigate('/result');
        })
        .catch(error => {
            console.error('Error:', error);
            setPopupInfo({
                isOpen: true,
                title: 'Error',
                message: 'No se pudo procesar tu solicitud.'
            });
        })
        .finally(() => setLoading(false));
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
                <button className="nav-link" onClick={handleLogout}>Cerrar Sesión</button>
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
                                    <p><sub>Nota: En caso de querer colocar números, colocalos como texto. Por ejemplo "1 = uno"</sub></p>
                                    
                                </div>
                            </div>
                            <div className='text-center'>
                                <button type="submit" className="btn btn-dark w-50 my-5">Listo</button>
                            </div>
                        </form>
                    </div>
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

export default HomePage;
