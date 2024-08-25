import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { name } from "@/apis/common";
import {
  AAVEBalance,
  DAIBalance,
  EURSBalance,
  LINKBalance,
  USDCBalance,
  USDTBalance,
  WBTCBalance,
  WETHBalance,
} from "@/apis/balance";
import {
  AAVEBorrowableAmount,
  DAIBorrowableAmount,
  EURSBorrowableAmount,
  LINKBorrowableAmount,
  USDCBorrowableAmount,
  USDTBorrowableAmount,
  WBTCBorrowableAmount,
  WETHBorrowableAmount,
} from "@/apis/borrowaleAmount";
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
interface Props {
  tableCol: string[][];
  setOpenBorrow: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenRepay: React.Dispatch<React.SetStateAction<boolean>>;
  allMarket: boolean;
  setCryptoImg: React.Dispatch<React.SetStateAction<string>>;
  setCryptoName: React.Dispatch<React.SetStateAction<string>>;

  setBorrowAmount: React.Dispatch<React.SetStateAction<string>>;
  setBorrowableAmount: React.Dispatch<React.SetStateAction<string>>;
  account: string;
}

export default function BorrowTableData({
  tableCol,
  setOpenBorrow,
  setOpenRepay,
  allMarket,
  setCryptoImg,
  setCryptoName,

  setBorrowAmount,
  setBorrowableAmount,
  account,
}: Props) {
  const handleBorrowClick = (index: number) => {
    if (account) {
      setCryptoName(tableCol[index][1]);
      setCryptoImg(tableCol[index][0]);
      setOpenBorrow(true);

      checkBorrowableAmount(tableCol[index][1], account);
    }
  };

  const handleRepayClick = (index: number) => {
    if (account) {
      setCryptoName(tableCol[index][1]);
      setCryptoImg(tableCol[index][0]);
      setOpenRepay(true);
      checkBorrowAmount(tableCol[index][1], account);
    }
  };

  const checkBorrowableAmount = async (cryptoName: string, account: string) => {
    if (cryptoName === name[0]) {
      DAIBorrowableAmount(account).then((item) =>
        setBorrowableAmount(item ?? " 0"),
      );
    } else if (cryptoName === name[1]) {
      USDTBorrowableAmount(account).then((item) =>
        setBorrowableAmount(item ?? "0"),
      );
    } else if (cryptoName === name[2]) {
      USDCBorrowableAmount(account).then((item) =>
        setBorrowableAmount(item ?? "0"),
      );
    } else if (cryptoName === name[3]) {
      WBTCBorrowableAmount(account).then((item) =>
        setBorrowableAmount(item ?? "0"),
      );
    } else if (cryptoName === name[4]) {
      LINKBorrowableAmount(account).then((item) =>
        setBorrowableAmount(item ?? "0"),
      );
    } else if (cryptoName === name[5]) {
      AAVEBorrowableAmount(account).then((item) =>
        setBorrowableAmount(item ?? "0"),
      );
    } else if (cryptoName === name[6]) {
      EURSBorrowableAmount(account).then((item) =>
        setBorrowableAmount(item ?? "0"),
      );
    } else {
      WETHBorrowableAmount(account).then((item) =>
        setBorrowableAmount(item ?? "0"),
      );
    }
  };

  const checkBorrowAmount = async (cryptoName: string, account: string) => {
    if (cryptoName === name[0]) {
      DAIBorrowAmount(account).then((item) => setBorrowAmount(item ?? " 0"));
    } else if (cryptoName === name[1]) {
      USDTBorrowAmount(account).then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[2]) {
      USDCBorrowAmount(account).then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[3]) {
      WBTCBorrowAmount(account).then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[4]) {
      LINKBorrowAmount(account).then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[5]) {
      AAVEBorrowAmount(account).then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[6]) {
      EURSBorrowAmount(account).then((item) => setBorrowAmount(item ?? "0"));
    } else {
      WETHBorrowAmount(account).then((item) => setBorrowAmount(item ?? "0"));
    }
  };

  return (
    <>
      {tableCol &&
        tableCol.map((col: string[], index: number) =>
          !allMarket && index > 3 ? null : (
            <tr key={index} className="column h-[74px]">
              <td>
                <div className="flex justify-center">
                  <img src={col[0]} className="mr-3 h-[28px] w-[28px]" />
                  <div className="mt-1 font-pretendard text-[14px] font-semibold leading-[20px] text-[#B0B0B0]">
                    {col[1]}
                  </div>
                </div>
              </td>
              <td className="font-pretendard text-[14px] font-normal leading-[24px] text-[#B0B0B0] ">
                {col[2]}
              </td>
              <td className="font-pretendard text-[14px] font-normal leading-[24px] text-[#B0B0B0] ">
                {col[3]}
              </td>

              <td>
                <div className=" h-[20px] w-[2px] bg-[#252423]" />
              </td>

              <td className="w-[350px] font-pretendard text-[14px] font-normal leading-[24px] text-[#3E4064]">
                <div className="flex justify-center">
                  <button
                    className="mr-4 items-center rounded-lg bg-[#2F8128]  px-5 py-2 text-[#E1E3EA] "
                    onClick={() => handleBorrowClick(index)}
                  >
                    Borrow
                  </button>
                  <button
                    className="items-center rounded-lg bg-[#262626] px-5 py-2 text-[#818A80]"
                    onClick={() => handleRepayClick(index)}
                  >
                    Repay
                  </button>
                </div>
              </td>

              <td className="font-pretendard text-[14px] font-normal leading-[24px] text-[#B0B0B0] ">
                {col[4]}
              </td>
              <td className="font-pretendard text-[14px] font-normal leading-[24px] text-[#B0B0B0] ">
                {col[5]}
              </td>
            </tr>
          ),
        )}
    </>
  );
}
