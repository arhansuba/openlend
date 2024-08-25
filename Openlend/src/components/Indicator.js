import React from "react";
// import Info from "./SVG's/Info";

const Indicator = ({ svg: SVG, headText, symbol, value }) => {
    return (
        <>
            <div className="d-flex align-items-center mt-2" style={{ height: '45px', marginRight: '5px' }}>
                <div className="p-2 rounded d-flex align-items" style={{ backgroundColor: '#383D51' }}>
                    <SVG height="19" width="20" strokeColor="#A5A8B6"/>
                </div>
                <div className="d-flex flex-column mx-2">
                    <div style={{ color: '#A5A8B6' }} className="fs-6">{headText}
                    </div>
                   
                    <div className="fw-bold fs-5" style={{ color: '#fff' }}>
                        {
                            symbol === '%' ?
                                <>
                                    {value}
                                    <span style={{ color: '#A5A8B6' }}>{symbol}</span>
                                </> :
                                <>
                                    <span style={{ color: '#A5A8B6' }}>{symbol}</span>
                                    {value}
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Indicator;