import { useState } from "react";
import SupplyTable from "./supply/SupplyTable";

import Switch from "./Switch";
import BorrowTable from "./borrow/BorrowTable";
import { useTmpContext } from "@/components/TmpContext";

export default function Main() {
  const { address, setAddress } = useTmpContext();
  const [supply, setSupply] = useState(true);
  const [borrow, setBorrow] = useState(false);
  const [allMarket, setAllMarket] = useState(false);

  return (
    <div className=" mt-20 flex  flex-col  justify-center px-5">
      <Switch
        supply={supply}
        borrow={borrow}
        setSupply={setSupply}
        setBorrow={setBorrow}
        setAllMarket={setAllMarket}
      />
      <div className="mt-10 flex">
        {supply === true ? (
          <SupplyTable allMarket={allMarket} account={address!} />
        ) : (
          <BorrowTable allMarket={allMarket} account={address!} />
        )}
      </div>
      <button
        className="mt-5 flex flex-col items-center justify-center"
        onClick={() => setAllMarket(!allMarket)}
      >
        <div className="flex items-center justify-center ">
          <img src="all_img.png" className="h-[16px] w-[16px] " />
          <div className="font-pretendard text-[14px] font-normal leading-[20px] text-[#525C52]">
            All market
          </div>
        </div>
        <div className=" mt-1 h-[1px] w-[99px] bg-[#525C52]" />
      </button>
      <div className="flex  flex-col items-center justify-center py-10">
        <img src="person.png" className="h-[50px] w-[500px] " />
        <div className="text-white">
          {/* 나는 몇개 예치하고 1년에 약 00 이자를 받을 수 있다 */}
        </div>
      </div>
    </div>
  );
}
