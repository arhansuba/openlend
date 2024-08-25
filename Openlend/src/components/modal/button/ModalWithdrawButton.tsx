import { useEffect, useState } from "react";
import {
  AAVEAprove,
  DAIAprove,
  EURSAprove,
  LINKAprove,
  USDCAprove,
  USDTAprove,
  WBTCAprove,
  WETHAprove,
} from "@/apis/approve";
import { name, pool_contract, usdc_address } from "@/apis/common";
import {
  AAVESupply,
  DAISupply,
  EURSSupply,
  LINKSupply,
  USDCSupply,
  USDTSupply,
  WBTCSupply,
  WETHSupply,
} from "@/apis/supply";
import {
  AAVEWithdraw,
  DAIWithdraw,
  EURSWithdraw,
  LINKWithdraw,
  USDCWithdraw,
  USDTWithdraw,
  WBTCWithdraw,
  WETHWithdraw,
} from "@/apis/withdraw";

interface Props {
  amount: string;
  cryptoName: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  max: string;
  account: string;
}

export default function ModalWithdrawButton({
  amount,
  setOpen,
  cryptoName,
  max,
  account,
}: Props) {
  const [disable, setDisable] = useState(true);
  const [approveDisable, setApproveDisable] = useState(false);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (account) {
      if (amount === "" || amount === "0") {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [amount]);

  const withdraw = async (tokenSupply: string, cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAIWithdraw(setDisable, setFlag, tokenSupply, account).then(() =>
        setOpen(false),
      );
    } else if (cryptoName === name[1]) {
      USDTWithdraw(setDisable, setFlag, tokenSupply, account).then(() =>
        setOpen(false),
      );
    } else if (cryptoName === name[2]) {
      USDCWithdraw(setDisable, setFlag, tokenSupply, account).then(() =>
        setOpen(false),
      );
    } else if (cryptoName === name[3]) {
      WBTCWithdraw(setDisable, setFlag, tokenSupply, account).then(() =>
        setOpen(false),
      );
    } else if (cryptoName === name[4]) {
      LINKWithdraw(setDisable, setFlag, tokenSupply, account).then(() =>
        setOpen(false),
      );
    } else if (cryptoName === name[5]) {
      AAVEWithdraw(setDisable, setFlag, tokenSupply, account).then(() =>
        setOpen(false),
      );
    } else if (cryptoName === name[6]) {
      EURSWithdraw(setDisable, setFlag, tokenSupply, account).then(() =>
        setOpen(false),
      );
    } else {
      WETHWithdraw(setDisable, setFlag, tokenSupply, account).then(() =>
        setOpen(false),
      );
    }
  };
  return (
    <div className="flex w-full flex-col">
      {/* <div className="flex w-full ">
        <img src="local_gas_station.png" className="h-[20px] w-[20px]" />
        <div className="font-pretendard font-nomal text-[16px] leading-[20px] text-[#535353]">
          $00.00
        </div>
      </div> */}

      <button
        className="mt-5 rounded-lg bg-[#52A44B] py-4 font-pretendard text-[20px] font-bold leading-[25px] text-white disabled:bg-gray-300 "
        disabled={disable}
        onClick={() => withdraw(amount, cryptoName)}
      >
        <div className="flex  justify-center">
          {flag && (
            <svg
              aria-hidden="true"
              className="mr-4 h-8 w-8 animate-spin fill-gray-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
          Confirm Withdraw
        </div>
      </button>
    </div>
  );
}
