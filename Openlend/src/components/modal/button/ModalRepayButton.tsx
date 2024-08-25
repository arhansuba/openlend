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
import {
  name,
  pool_address,
  pool_contract,
  usdc_address,
  usdc_contract,
} from "@/apis/common";
import {
  AAVERepay,
  DAIRepay,
  EURSRepay,
  LINKRepay,
  USDCRepay,
  USDTRepay,
  WBTCRepay,
  WETHRepay,
} from "@/apis/repay";

interface Props {
  cryptoName: string;
  amount: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  max: string;
  account: string;
}
export default function ModalRepayButton({
  cryptoName,
  amount,
  setOpen,
  max,
  account,
}: Props) {
  const [disable, setDisable] = useState(true);
  const [approveDisable, setApproveDisable] = useState(true);
  const [approveFlag, setApproveFlag] = useState(false);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (account) {
      if (amount === "" || amount === "0") {
        setApproveDisable(true);
      } else {
        setApproveDisable(false);
      }
    }
  }, [amount]);

  const approve = async (tokenSupply: string, cryptoName: string) => {
    // Token approval

    if (cryptoName === name[0]) {
      DAIAprove(setApproveDisable, setApproveFlag, tokenSupply, account).then(
        () => {
          setDisable(false);
          setApproveDisable(true);
        },
      );
    } else if (cryptoName === name[1]) {
      USDTAprove(setApproveDisable, setApproveFlag, tokenSupply, account).then(
        () => {
          setDisable(false);
          setApproveDisable(true);
        },
      );
    } else if (cryptoName === name[2]) {
      USDCAprove(setApproveDisable, setApproveFlag, tokenSupply, account).then(
        () => {
          setDisable(false);
          setApproveDisable(true);
        },
      );
    } else if (cryptoName === name[3]) {
      WBTCAprove(setApproveDisable, setApproveFlag, tokenSupply, account).then(
        () => {
          setDisable(false);
          setApproveDisable(true);
        },
      );
    } else if (cryptoName === name[4]) {
      LINKAprove(setApproveDisable, setApproveFlag, tokenSupply, account).then(
        () => {
          setDisable(false);
          setApproveDisable(true);
        },
      );
    } else if (cryptoName === name[5]) {
      AAVEAprove(setApproveDisable, setApproveFlag, tokenSupply, account).then(
        () => {
          setDisable(false);
          setApproveDisable(true);
        },
      );
    } else if (cryptoName === name[6]) {
      EURSAprove(setApproveDisable, setApproveFlag, tokenSupply, account).then(
        () => {
          setDisable(false);
          setApproveDisable(true);
        },
      );
    } else {
      WETHAprove(setApproveDisable, setApproveFlag, tokenSupply, account).then(
        () => {
          setDisable(false);
          setApproveDisable(true);
        },
      );
    }
  };

  const repay = async (tokenSupply: string) => {
    if (cryptoName === name[0]) {
      DAIRepay(setDisable, setFlag, tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[1]) {
      USDTRepay(setDisable, setFlag, tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[2]) {
      USDCRepay(setDisable, setFlag, tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[3]) {
      WBTCRepay(setDisable, setFlag, tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[4]) {
      LINKRepay(setDisable, setFlag, tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[5]) {
      AAVERepay(setDisable, setFlag, tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[6]) {
      EURSRepay(setDisable, setFlag, tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else {
      WETHRepay(setDisable, setFlag, tokenSupply, account).then(() => {
        setOpen(false);
      });
    }
  };

  return (
    <div className="flex w-full flex-col">
      {/* <div className="p-3 rounded-[20px]  bg-[#151615] flex  justify-between h-[50px]">
        <div className="flex text-[#B0B0B0]">Health factor</div>
        <div className="flex text-[#B0B0B0]">{"00 -> 00"}</div>
      </div> */}

      <button
        className="mt-5 rounded-lg bg-[#52A44B] py-4 font-pretendard text-[20px] font-bold leading-[25px] text-white disabled:bg-gray-300"
        disabled={approveDisable}
        onClick={() => approve(amount, cryptoName)}
      >
        <div className="flex  justify-center">
          {approveFlag && (
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
          Approve
        </div>
      </button>

      <button
        className="mt-5 rounded-lg bg-[#52A44B] py-4 font-pretendard text-[20px] font-bold leading-[25px] text-white disabled:bg-gray-300 "
        disabled={disable}
        onClick={() => repay(amount)}
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
          Confirm Repay
        </div>
      </button>
    </div>
  );
}
