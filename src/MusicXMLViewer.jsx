import React, { useEffect, useRef } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const MusicXMLViewer = ({ musicXML }) => {
    const osmdContainerRef = useRef(null);
    const osmd = useRef(null);

    useEffect(() => {
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
            osmd.current
                .load(musicXML)
                .then(() => {
                    osmd.current.render();
                })
                .catch(error => console.error("Error loading or rendering musicXML", error));
        }
    }, [musicXML]);

    return <div style={{ overflowY: 'auto', maxHeight: '80vh', backgroundColor: 'white' }}>
        <div ref={osmdContainerRef} />
    </div>;
};

export default MusicXMLViewer;
