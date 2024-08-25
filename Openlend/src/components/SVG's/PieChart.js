import React from "react";

const PieChart = ({ height, width, strokeColor }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.886 2A10.059 10.059 0 1 0 22 13.114H10.886V2Z" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M21.489 8.644h-6.133V2.511a10.086 10.086 0 0 1 6.133 6.133Z" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        </>
    )
}

export default PieChart;