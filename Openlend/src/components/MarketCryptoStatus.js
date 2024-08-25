import React from "react";
import Button from "./Button";

const DashCryptoStatusBorrow = ({ data }) => {

    const myfunc = () => {
        console.log('data: ', data);
    }

    return (
        <>
            {/* for xtra larger devices */}
            <div className="d-none d-xl-flex my-2 p-2" style={{ borderBottom: '1px solid rgb(234, 235, 239)' }}>
                <div className="d-flex justify-content-between text-center" style={{ backgroundColor: 'white', width: '90%' }}>
                    {/* asset */}
                    <div className="d-flex align-items-center" style={{ width: '17%' }}>
                        <img src={data.imgUrl} alt={data.asset} height="25px" width="25px" />
                        <div className="d-flex flex-column align-items-start mx-1">
                            <div className="fs-5 fw-bold">{data.name}</div>
                            <div className="fs-6" style={{ color: '#8e92a3' }}>{data.asset}</div>
                        </div>
                    </div>
                    {/* total supply */}
                    <div className="d-flex flex-column align-items-center" style={{ width: '17%' }}>
                        <div className="fs-5 fw-bold">{data.supplyUp}</div>
                        <div className="fs-6" style={{ color: '#8e92a3' }}>${data.supplyDown}</div>
                    </div>
                    {/* supply apy */}
                    <div className="fs-6" style={{ width: '17%' }}>{data.supplyAPY}</div>
                    {/* total borrowed */}
                    <div className="d-flex flex-column align-items-center" style={{ width: '17%' }}>
                        <div className="fs-5 fw-bold">{data.borrowUp}</div>
                        <div className="fs-6" style={{ color: '#8e92a3' }}>${data.borrowDown}</div>
                    </div>
                    {/* borrowed apy,variable */}
                    <div className="fs-6" style={{ width: '17%' }}>
                        {
                            data.apyvar === "-" ?
                                data.apyvar :
                                `${data.apyvar}%`
                        }
                    </div>
                    {/* borrowed apy,stable */}
                    <div className="fs-6" style={{ width: '17%' }}>
                        {
                            data.apystable === '-' ?
                                data.apystable :
                                `${data.apystable}%`
                        }
                    </div>
                </div>
                <div className="" style={{ width: '10%' }}>
                <Button func={myfunc} width="85" text="Details" className="mx-1"/>
                </div>
            </div>

            {/* for smaller to larger  devices */}
            <div className="d-flex flex-column p-2 d-xl-none" style={{ borderBottom: '1px solid rgb(234, 235, 239)' }}>
                {/* asset */}
                <div className="d-flex align-items-center">
                    <img src={data.imgUrl} alt={data.asset} height="25px" width="25px" />
                    <div className="d-flex flex-column align-items-start mx-1">
                        <div className="fs-5 fw-bold">{data.name}</div>
                        <div className="fs-6" style={{ color: '#8e92a3' }}>{data.asset}</div>
                    </div>
                </div>
                {/* total supply */}
                <div className="d-flex justify-content-between">
                    <div className="">Total Supply</div>
                    <div className="d-flex flex-column align-items-end">
                        <div className="fs-5 fw-bold">{data.supplyUp}</div>
                        <div className="fs-6" style={{ color: '#8e92a3' }}>${data.supplyDown}</div>
                    </div>
                </div>
                {/* supply apy */}
                <div className="d-flex justify-content-between">
                    <div className="">Supply APY</div>
                    <div className="">{data.supplyAPY}</div>
                </div>
                {/* total borrowed */}
                <div className="d-flex justify-content-between">
                    <div className="">Total Borrow</div>
                    <div className="d-flex flex-column align-items-end">
                        <div className="fs-5 fw-bold">{data.borrowUp}</div>
                        <div className="fs-6" style={{ color: '#8e92a3' }}>${data.borrowDown}</div>
                    </div>
                </div>
                {/* borrowed apy,variable */}
                <div className="d-flex justify-content-between">
                    <div className="">Borrow, APY variable</div>
                    <div className="">
                        {
                            data.apyvar === "-" ?
                                data.apyvar :
                                `${data.apyvar}%`
                        }
                    </div>
                </div>
                {/* borrowed apy,stable */}
                <div className="d-flex justify-content-between">
                    <div className="">Borrow, APY stable</div>
                    <div className="">
                        {
                            data.apystable === '-' ?
                                data.apystable :
                                `${data.apystable}%`
                        }
                    </div>
                </div>
                <div className="d-flex my-1 justify-content-center">
                      <Button func={myfunc} width="85" text="Details"/>
                </div>
            </div>
        </>
    );
}

export default DashCryptoStatusBorrow;