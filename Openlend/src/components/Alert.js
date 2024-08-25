import React from "react";
import Info from "./SVG's/Info";

const Alert = ({ bgColor, infoColor, text }) => {
  return (
    <>
      <div className="px-2 py-1 d-flex align-items-center" style={{ backgroundColor: bgColor,borderRadius:'5px' }}>
        <div className="d-flex align-items-center">
          <Info height="20" width="20" strokeColor={infoColor} />
        </div>
        <div style={{ marginLeft: '10px' }}>{text}</div>
      </div>
    </>
  );
}

export default Alert;