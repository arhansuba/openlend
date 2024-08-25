import React from "react";
import MarketCryptoStatus from "./MarketCryptoStatus";

const ContainerMarket = ({data}) => {
    return (
        <>
            <div className="global_crypto_container" style={{width:'100%',zIndex:'1',backgroundColor:'white',marginTop:'-30px'}}>
                <h5 className="fw-bold">Ethereum Markets</h5>
                {/* for medium to xl devices */}
                <div className="d-none d-xl-flex justify-content-between text-center mt-3" style={{ width: '90%', backgroundColor: 'white', position: 'sticky', top: '50px' }}>
                    <div className="global_sticky_marks" style={{ width: '15%' }}>Assets</div>
                    <div className="global_sticky_marks" style={{ width: '15%' }}>Total Supply</div>
                    <div className="global_sticky_marks" style={{ width: '15%' }}>Supply APY</div>
                    <div className="global_sticky_marks" style={{ width: '15%' }}>Total borrowed</div>
                    <div className="global_sticky_marks" style={{ width: '15%' }}>Borrow,APY variable</div>
                    <div className="global_sticky_marks" style={{ width: '15%' }}>Borrow,APY stable</div>
                </div>
                <div className="my-2">
                    {
                        data.map((data, index) => {
                            return <MarketCryptoStatus data={data} key={index} />
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ContainerMarket;