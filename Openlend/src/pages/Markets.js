import React,{useEffect} from "react";
import Indicator from "../components/Indicator";
import Available from "../components/SVG's/Available";
import PieChart from "../components/SVG's/PieChart";
import Borrow from "../components/SVG's/Borrow";
import ContainerMarket from "../components/ContainerMarket";
import Dropdown from "../components/Dropdown";
import { DataMarket } from "../Data";

const Markets = () => {

  useEffect(()=>{
      console.log("we can make api request here...");
  },[]);

  return (
    <>
    {/* upper div with indicators */}
      <div className="d-flex flex-column align-items-center">
        <div className="global_upper_container d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column" style={{ width: '90%' }}>
            <div className="d-flex flex-column align-items-start">
              <div className="fs-5 d-block d-md-none fw-bold" style={{ color: '#A5A8B6' }}>Markets</div>
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

            {/* Indicators */}
            <div className="d-flex flex-wrap">
              <Indicator svg={PieChart} headText="Total market size" value="6.58B" symbol="$" />
              <Indicator svg={Available} headText="Total available" value="4.77B" symbol="$" />
              <Indicator svg={Borrow} headText="Total borrows" value="1.81B" symbol="$" />
            </div>
          </div>
        </div>

        {/* market container */}
        <div className="d-flex" style={{ width: '90%', position: 'relative', zIndex: '1'}}>
          <ContainerMarket data={DataMarket}/>
        </div>
      </div>
    </>
  );
}

export default Markets;
