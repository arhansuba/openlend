import React from "react";

const Available = ({ height, width, strokeColor }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.375 3v1.125m0 4.5V9.75M17.625 3 14.25 6.375M17.625 21V3v18Zm0-18L21 6.375 17.625 3ZM6.375 21 3 17.625m3.375-3.375V21v-6.75Zm0 6.75 3.375-3.375L6.375 21Z" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        </>
    )
}

export default Available;