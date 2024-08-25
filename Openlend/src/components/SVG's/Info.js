import React from "react";

const Info = ({height,width,strokeColor}) => {
    return (
        <>
            <svg height={height} width={width} className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1rqf5ri" focusable="false" aria-hidden="true" viewBox="0 0 20 20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={strokeColor} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </svg>
        </>
    )
}

export default Info;