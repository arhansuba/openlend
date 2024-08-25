import React from "react";

const Copy = ({ height, width, strokeColor }) => {
    return (
        <>
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-g7go18" focusable="false" aria-hidden="true" viewBox="0 0 24 24" height={height} width={width}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={strokeColor} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
            </svg>
        </>
    )
}

export default Copy;