import React, { useRef } from "react";
import Alert from "./Alert";
import DashCryptoStatusSupply from "./DashCryptoStatusSupply";

const ToggleContainerSupply = ({ id,data }) => {
    const btnRef = useRef(null);
    const isCollapseOpen = useRef(false);

    const toggleCollapse = () => {
        isCollapseOpen.current = !isCollapseOpen.current;
        if (isCollapseOpen.current) {
            btnRef.current.textContent = 'Hide -';
        } else {
            btnRef.current.textContent = 'Show +';
        }
    }

    return (
        <>
            <div className="global_crypto_container" style={{ backgroundColor: '#fff' }}>
                <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">Assets to supply</h5>
                    <div className="global_collapse_btn" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="false" aria-controls={id} ref={btnRef} onClick={toggleCollapse}>
                        Show +
                    </div>
                </div>
                <div id={id} className="collapse">
                    <div className="mt-2">
                        <Alert bgColor="#e5effb" infoColor="#0062D2" text="Your Ethereum wallet is empty. Purchase or transfer assets"/>
                    </div>
                    {/* for medium to xl devices */}
                    <div className="d-none d-md-flex justify-content-between text-center mt-3" style={{width:'70%',backgroundColor:'white',position:'sticky',top:'50px'}}>
                        <div className="global_sticky_marks" style={{width:'25%'}}>Assets</div>
                        <div className="global_sticky_marks" style={{width:'25%'}}>Wallet Balance</div>
                        <div className="global_sticky_marks" style={{width:'25%'}}>APY</div>
                        <div className="global_sticky_marks" style={{width:'25%'}}>Can be collateral</div>
                    </div>

                    {/* mapping all the data */}
                    <div className="my-2">
                        {
                            data.map((data,index)=>{
                               return <DashCryptoStatusSupply data={data} key={index}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToggleContainerSupply;