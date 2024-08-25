import React, { useEffect } from "react";
import Indicator from "../components/Indicator";
import Wallet from "../components/SVG's/Wallet";
import Graph from "../components/SVG's/Graph";
import Container from "../components/Container";
import ToggleContainerSupply from './../components/ToggleContainerSupply';
import ToggleContainerBorrow from './../components/ToggleContainerBorrow';
import { DataBorrow, DataSupply } from "../Data";
import Dropdown from "../components/Dropdown";
import "../css/Dashboard.css";

const Dashboard = () => {

  useEffect(() => {
    console.log("we can make api request here...");
  }, []);

  return (
    <>
      {/* upper div with indicators */}
      <div className="d-flex flex-column align-items-center">
        <div className="global_upper_container d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column" style={{ width: '90%' }}>
            <div className="d-flex flex-column align-items-start">
              <div className="fs-5 d-block d-md-none fw-bold" style={{ color: '#A5A8B6' }}>Dashboard</div>
              <div className="d-flex align-items-center">
                <img src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png" height="30px" width="30px" alt="" />
                <h3 className="fw-bold text-light mx-1">
                  <Dropdown selectedVal={"Ethereum Market"} list={[
                    {
                      imgUrl: "https://dual.cafeswap.finance/images/tokens/busd.png",
                      name: 'Binance USD'
                    },
                    {
                      imgUrl: "https://dual.cafeswap.finance/images/tokens/busd.png",
                      name: 'Binance USD'
                    }
                  ]} />
                </h3>
              </div>
            </div>
            {/* indicators */}
            <div className="d-flex flex-wrap">
              <Indicator svg={Wallet} headText="Net Worth" value="15" symbol="$" />
              <Indicator svg={Graph} headText="Net APY" value="10" symbol="%" />
            </div>
          </div>
        </div>


        <div className="d-flex flex-xl-row flex-column" style={{ width: '90%', position: 'relative', zIndex: '1', marginTop: '-30px' }}>
          {/* supply assets */}
          <div className="supply">
            <Container />
            <ToggleContainerSupply id="supply" data={DataSupply} />
          </div>
          {/* borrow assets */}
          <div className="borrow">
            <Container />
            <ToggleContainerBorrow id="borrow" data={DataBorrow} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
