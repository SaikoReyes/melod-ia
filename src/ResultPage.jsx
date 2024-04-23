import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css'; // Asegúrate de que este archivo contenga los estilos adecuados
import sampleImage from './images/pentagram.jpg'; // Reemplaza con la ruta a tu imagen o PDF
// Si es un PDF, puedes importarlo directamente si tu configuración de webpack lo permite
import samplePDF from './images/pentagram.pdf';

function ResultPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    const handleDownload = () => {
        // Aquí implementarías la lógica para descargar la imagen o PDF
        console.log('Descargar archivo');
    };

    const handleShare = () => {
        // Aquí implementarías la lógica para compartir la imagen o PDF
        console.log('Compartir archivo');
    };

    return (
        <div className="result-background">
            <div className="banner">
                <h2>MELOD-IA</h2>
                <button className="nav-link" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <div className="container my-4 text-center my-5">
                {/* Si es una imagen 
                <img src={sampleImage} alt="Partitura musical" className="music-sheet" />
                */}

                {/* Si quisieras mostrar un PDF */}
                <embed src={samplePDF} type="application/pdf" width="500" height="600" className="music-sheet" />
                
                <div className="links">
                    <a href="#" onClick={handleDownload}>Descargar</a>
                    <a href="/homepage">Volver al inicio</a>
                    <a href="#" onClick={handleShare}>Compartir</a>
                </div>
            </div>
            <div className="footer-link">
                <span>Melod-IA</span>
            </div>
        </div>
    );
}

export default ResultPage;
