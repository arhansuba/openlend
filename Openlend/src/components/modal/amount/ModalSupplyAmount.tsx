import { useEffect, useRef, useState } from "react";
import {
  AAVEBorrowAmount,
  DAIBorrowAmount,
  EURSBorrowAmount,
  LINKBorrowAmount,
  USDCBorrowAmount,
  USDTBorrowAmount,
  WBTCBorrowAmount,
  WETHBorrowAmount,
} from "@/apis/borrowAmount";
import { name } from "@/apis/common";

interface Props {
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  max: string;
  account: string;
}
export default function ModalSupplyAmount({
  setAmount,
  amount,
  max,
  account,
}: Props) {
  const [ltv, setLtv] = useState("0%");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (account) {
      checkMyBorrow(account);
    }
  }, [account]);
  const handleAmount = (e: any) => {
    if (parseInt(amount) > parseInt(max)) {
      setAmount(max);
      const result = (balance / parseFloat(max)) * 100;
      setLtv(result.toFixed(2) + "%");
    } else {
      setAmount(e.target.value);
      const result = (balance / parseFloat(e.target.value)) * 100;
      if (e.target.value === "") {
        setLtv("0%");
      } else {
        setLtv(result.toFixed(2) + "%");
      }
    }
  };

  const handleMax = () => {
    setAmount(max);
    const result = (balance / parseFloat(max)) * 100;
    setLtv(result.toFixed(2) + "%");
  };

  const checkMyBorrow = async (account: string) => {
    const dai = await DAIBorrowAmount(account);
    const usdt = await USDTBorrowAmount(account);
    const usdc = await USDCBorrowAmount(account);
    const wbtc = await WBTCBorrowAmount(account);
    const link = await LINKBorrowAmount(account);
    const aave = await AAVEBorrowAmount(account);
    const eurs = await EURSBorrowAmount(account);
    const weth = await WETHBorrowAmount(account);

    const result =
      parseFloat(dai) +
      parseFloat(usdt) +
      parseFloat(usdc) +
      parseFloat(wbtc) +
      parseFloat(link) +
      parseFloat(aave) +
      parseFloat(eurs) +
      parseFloat(weth);

    setBalance(result);
  };

  const handleClick = () => {
    setAmount("");
    setLtv("0%");
  };

  return (
    <div className="flex w-full">
      <div className="flex h-[120px]  w-[158px] flex-col rounded-[20px] bg-[#151615] p-3">
        <div className="mb-5 flex justify-start text-white">LTV</div>
        <div className="flex justify-end text-white">{ltv}</div>
      </div>
      <div className="mx-2 flex items-center">
        <svg
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25 13C25 19.9036 19.4036 25.5 12.5 25.5C5.59644 25.5 0 19.9036 0 13C0 6.09644 5.59644 0.5 12.5 0.5C19.4036 0.5 25 6.09644 25 13ZM7.20312 12.0263H17.3726V9.39844H7.20312V12.0263ZM7.20312 17.4067V14.8075C7.92497 14.0405 8.83789 13.6464 9.83573 13.6357C10.7013 13.641 11.5012 13.9413 12.3021 14.2418C13.1121 14.5458 13.923 14.8501 14.8037 14.8501C15.7909 14.8501 16.672 14.456 17.3726 13.6784V16.2775C16.6508 17.0445 15.7379 17.4493 14.74 17.4493C13.866 17.4493 13.0561 17.1459 12.2461 16.8424C11.4426 16.5414 10.6389 16.2402 9.77204 16.2349C8.78481 16.2456 7.90374 16.6397 7.20312 17.4067Z"
            fill="url(#paint0_linear_5610_19602)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_5610_19602"
              x1="0"
              y1="13"
              x2="25"
              y2="13"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#567554" />
              <stop offset="1" stopColor="#6EC568" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex h-[120px]  w-[240px] flex-col rounded-[20px]  bg-[#151615] p-3">
        <div className="mb-5  inline-block flex bg-gradient-to-r from-[#567554] via-[#6EC568] to-[#567554] bg-clip-text font-pretendard text-[20px] font-bold leading-[25px] text-transparent ">
          Amount
        </div>

        <div className="flex flex-col ">
          <div className="flex ">
            <input
              type="number"
              autoFocus={true}
              placeholder="0"
              className="inline-block w-[210px] bg-gradient-to-r from-[#567554] via-[#6EC568] to-[#567554] bg-clip-text text-right font-pretendard text-[18px] font-bold leading-[25px] text-transparent placeholder-current caret-white outline outline-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              required
              value={amount}
              onChange={(e) => handleAmount(e)}
            />
            {amount && (
              <button onClick={handleClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#52A44B"
                  className="mt-1 h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            )}
          </div>
          {/* <div className="text-right bg-gradient-to-r from-[#567554] via-[#6EC568] to-[#567554] inline-block text-transparent bg-clip-text font-pretendard  text-[11px] leading-[15px] ">
              $0.00
            </div> */}

          <button
            // className="ml-auto rounded  bg-[#2F8128]  text-[#E1E3EA] w-[40px]"
            onClick={handleMax}
          >
            <div className="text-right font-pretendard text-[11px]  leading-[15px] text-white ">
              MAX
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
