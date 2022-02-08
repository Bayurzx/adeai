import React from 'react';
import { Spin } from 'antd';

let spinnerStyle = {
    width: "Xu",
    height: "Yu",
    top: "50%",
    left: "50%",
    marginLeft: "-(X/2)u",
    marginTop: "-(Y/2)u",
    zIndex: 11,
    position: "fixed",
}

function Spinner() {
    return (
        <>
            <div className="" style={spinnerStyle}>
                <Spin tip="Loading..." size="large" />
            </div>
        </>
    );
}

export default Spinner;
