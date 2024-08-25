import React from "react";

const HamburgerBtn = ({ height, width, strokeColor }) => {
    return (
        <>
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-q5q60p" height={height} width={width} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={strokeColor} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </svg>
        </>
    )
}

export default HamburgerBtn;