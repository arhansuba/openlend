import React from "react";

const Disconnect = ({ height, width, strokeColor }) => {
    return (
        <>
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-g7go18" focusable="false" aria-hidden="true" viewBox="0 0 24 24" height={height} width={width} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={strokeColor} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
            </svg>
        </>
    )
}

export default Disconnect;