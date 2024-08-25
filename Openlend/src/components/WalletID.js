import React from "react";

const WalletID = ({ imgUrl, address, height, width,textColor }) => {
    return (
        <>
            <div className="d-flex align-items-center">
                <img src={imgUrl} alt="" height={height} width={width} className="rounded-circle" style={{marginRight:'5px'}} />
                <div style={{color:`${textColor}`}}>{address.slice(0,4) + "...." + address.slice(-4)}</div>
            </div>
        </>
    );
}

export default WalletID;