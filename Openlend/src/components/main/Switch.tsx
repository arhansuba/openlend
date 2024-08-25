import { useState } from "react";

interface Props {
  supply: boolean;
  borrow: boolean;
  setSupply: React.Dispatch<React.SetStateAction<boolean>>;
  setBorrow: React.Dispatch<React.SetStateAction<boolean>>;
  setAllMarket: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Switch({
  supply,
  borrow,
  setSupply,
  setBorrow,
  setAllMarket,
}: Props) {
  const clickSupply = () => {
    setSupply(true);
    setBorrow(false);
    setAllMarket(false);
  };

  const clickBorrow = () => {
    setSupply(false);
    setBorrow(true);
    setAllMarket(false);
  };

  return (
    <div className="mx-auto mb-5 flex flex-wrap">
      <button
        className={`mr-10  font-montserrat text-[30px] font-bold leading-[45px] ${
          supply === true ? "text-[#F6FFF9]" : "text-[#F6FFF9]/20"
        }`}
        onClick={clickSupply}
      >
        Supply
      </button>
      <button
        className={`mr-10  font-montserrat text-[30px] font-bold leading-[45px] ${
          borrow === true ? "text-[#F6FFF9]" : "text-[#F6FFF9]/20"
        }`}
        onClick={clickBorrow}
      >
        Borrow
      </button>
    </div>
  );
}
