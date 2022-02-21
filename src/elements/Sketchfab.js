import React from 'react';

function Sketchfab({ sketchFabId ="8d913bda48f84217902e6829982c494f"}) {
    return (
        <>
            {/* sneaker: cc89c1e265514cbab1234eba999683e1 */}
            {/* chair: 8d913bda48f84217902e6829982c494f */}
            {/* swimmer: 83338897566c4288a8e5f10db623ff18 */}
            {/* dino: 06cb55f941d94dc8b95ac46f92d89e7c */}
            {/* iPhone: 2cef7b2569cd4b458737d4c42abe3613 */}
            <iframe id="view360Iframe" width="100%" height="450px" scrolling={0} src={`https://sketchfab.com/models/${sketchFabId}/embed?ui_infos=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&preload=1&autostart=1&ui_hint=2&autospin=0.2`}>
            </iframe>

        </>
    );
}

export default Sketchfab;
