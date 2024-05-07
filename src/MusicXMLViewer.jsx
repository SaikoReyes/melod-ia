import React, { useEffect, useRef, useState } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import OSMDAudioPlayer from 'osmd-audio-player';
import './ResultPage.css';

const MusicXMLViewer = ({ musicXML }) => {
    const osmdContainerRef = useRef(null);
    const osmd = useRef(null);
    const audioPlayer = useRef(new OSMDAudioPlayer());
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const loadAndRenderMusic = async () => {
            if (!osmd.current && osmdContainerRef.current) {
                osmd.current = new OpenSheetMusicDisplay(osmdContainerRef.current, {
                    autoResize: true,
                    backend: 'svg',
                    drawingParameters: 'compact',
                    drawPartNames: false,
                    drawMeasureNumbers: false,
                });
            }

            if (osmd.current && musicXML) {
                try {
                    await osmd.current.load(musicXML);
                    osmd.current.render();
                    await audioPlayer.current.loadScore(osmd.current);
                    osmd.current.cursor.show(); 
                } catch (error) {
                    console.error('Error al renderizar el XML', error);
                }
            }
        };

        loadAndRenderMusic();
    }, [musicXML]);

    const handlePlay = async () => {
        setIsPlaying(true);
        osmd.current.cursor.reset(); 
        osmd.current.cursor.show(); 
        await audioPlayer.current.loadScore(osmd.current);
        audioPlayer.current.play();
    };

    const handleStop = async () => {
        setIsPlaying(false);
        audioPlayer.current.stop();
        osmd.current.cursor.reset();
    };

    return (
        <div>
            <div style={{ overflowY: 'auto', maxHeight: '80vh', backgroundColor: 'white' }}>
                <div ref={osmdContainerRef} />
            </div>
            <button onClick={handlePlay} className="button-dark" disabled={isPlaying}>
                Reproducir
            </button>
            <button onClick={handleStop} className="button-dark">
                Detener
            </button>
        </div>
    );
};

export default MusicXMLViewer;
