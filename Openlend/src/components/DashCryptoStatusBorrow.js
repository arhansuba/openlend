import React from "react";
import Button from "./Button";

const DashCryptoStatusBorrow = ({data}) => {

    const myfunc = ()=>{
        console.log('data: ',data);
    }

    return (
        <>
        {/* for larger devices */}
            <div className="d-none d-md-flex my-2 p-2" style={{borderBottom:'1px solid rgb(234, 235, 239)'}}>
                <div className="d-flex justify-content-between text-center" style={{ backgroundColor: 'white', width: '70%' }}>
                   <div className="d-flex align-items-center" style={{width:'25%'}}>
                   <img src={data.imgUrl} alt={data.asset} height="25px" width="25px" />
                   <div className="fs-6 mx-1">{data.asset}</div>
                   </div>
                    <div className="fs-6" style={{width:'25%'}}>{data.available}</div>
                    <div className="fs-6" style={{width:'25%'}}>{data.apyvar}%</div>
                    <div className="fs-6" style={{width:'25%'}}>{data.apystable}</div>
                </div>
                <div className="" style={{width:'30%'}}>
                <Button func={myfunc} width="45" disabled={true} text="Borrow" className="mx-1"/>
                <Button func={myfunc} width="45" text="Details"/>
                </div>
            </div>

        {/* for smaller devices */}
        <div className="d-flex flex-column d-md-none" style={{borderBottom:'1px solid rgb(234, 235, 239)'}}>
                {/* logo and name */}
                <div className="d-flex align-items-center my-1">
                    <img src={data.imgUrl} alt={data.asset} height="30px" width="30px" />
                    <div className="d-flex flex-column mx-1">
                        <div className="fs-5 fw-bold">{data.name}</div>
                        <div className="fs-6" style={{ color: '#8e92a3' }}>{data.asset}</div>
                    </div>
                </div>
                {/* information */}
                <div className="d-flex justify-content-between">
                    <div className="">Available</div>
                    <div>{data.available}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="">APY,variable</div>
                    <div>{data.apyvar}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="">APY,stable</div>
                    <div>{data.apystable}</div>
                </div>
                <div className="d-flex my-1">
                <Button func={myfunc} width="50" disabled={true} text="Borrow" className="mx-1"/>
                <Button func={myfunc} width="50" text="Details"/>
                </div>
            </div>
        </>
    );
}

export default DashCryptoStatusBorrow;