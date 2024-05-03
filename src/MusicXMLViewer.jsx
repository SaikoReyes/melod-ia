import React, { useEffect, useRef } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import OSMDAudioPlayer from 'osmd-audio-player';
import './ResultPage'

const MusicXMLViewer = ({ musicXML }) => {
    const osmdContainerRef = useRef(null);
    const osmd = useRef(null);
    const audioPlayer = useRef(new OSMDAudioPlayer());

    useEffect(() => {
        const loadAndRenderMusic = async () => {
            if (!osmd.current && osmdContainerRef.current) {
                osmd.current = new OpenSheetMusicDisplay(osmdContainerRef.current, {
                    autoResize: true,
                    backend: "svg",
                    drawingParameters: "compact",
                    drawPartNames: false,
                    drawMeasureNumbers: false,
                });
            }

            if (osmd.current && musicXML) {
                try {
                    await osmd.current.load(musicXML);
                    osmd.current.render();
                    await audioPlayer.current.loadScore(osmd.current); 
                } catch (error) {
                    console.error("Error loading or rendering musicXML", error);
                }
            }
        };

        loadAndRenderMusic();
    }, [musicXML]);

    const handlePlay = () => {
        audioPlayer.current.play();
    };

    const handleStop = () => {
        audioPlayer.current.pause();
    };

    return (
        <div>
            <div style={{ overflowY: 'auto', maxHeight: '80vh', backgroundColor: 'white' }}>
                <div ref={osmdContainerRef} />
            </div>
            <button onClick={handlePlay} className="button-dark">
                Reproducir
            </button>
            <button onClick={handleStop} className="button-dark">
                Detener
            </button>
        </div>
    );
    
};

export default MusicXMLViewer;
