import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css';
import MusicXMLViewer from './MusicXMLViewer';
import axios from 'axios';
import config from './config';

function ResultPage() {
    const navigate = useNavigate();
    const [musicXML, setMusicXML] = useState(null);

    useEffect(() => {
        const partituraId = localStorage.getItem('partituraId');
        const userToken = localStorage.getItem('userToken');
        if (partituraId && userToken) { 
            axios.get(`${config.API_BASE_URL}/api/get_xml_by_id/${partituraId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })
            .then(response => {
                setMusicXML(response.data.xml);
                console.log("Texto de la Partitura:", response.data.texto);
            })
            .catch(error => {
                console.error('Failed to fetch XML:', error);
            });
        } else {
            
            console.log("Falta ID de partitura o token de usuario.");
            navigate('/login'); 
        }
    }, []);

    const downloadXML = (xmlData) => {
        const blob = new Blob([xmlData], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().getTime();
        link.href = url;
        link.download = `Partitura-MELOD-IA-${timestamp}.xml`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    const handleDownload = () => {
        if (musicXML) {
            downloadXML(musicXML);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'MELOD-IA',
                text: 'Ven y crea tu propia partitura con nosotros :)',
                url: `${config.URL_SHARE}`
            })
            .then(() => console.log('¡Gracias por compartir!'))
            .catch(error => console.error('Error al compartir:', error));
        } else {
            console.error('La función de compartir no está disponible en tu navegador.');
            alert('La función de compartir no está disponible en tu navegador. Por favor, usa un navegador que soporte la Web Share API.');
        }
    };
    

    return (
        <div className="result-background">
            <div className="banner">
                <h2>MELOD-IA</h2>
                <button className="nav-link" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <div className="container my-4 text-center my-5">
                {musicXML ? <MusicXMLViewer musicXML={musicXML} /> : <p>Loading...</p>}
                <div>
                    <button onClick={handleDownload} className="btn btn-dark w-25 my-5">Descargar</button>
                    <button onClick={handleShare} className="btn btn-dark w-25 my-5">Compartir</button>
                </div>
            </div>
            <div className="footer-link">
                <a href='./homepage' className="nav-link">Inicio</a>
                <span>Melod-IA</span>
                <a href="/history" className="nav-link">Historial</a>
            </div>
        </div>
    );
}

export default ResultPage;
