import { useEffect, useState } from "react";
import ModalHeader from "./ModalHeader";
import ModalMain from "./ModalMain";
import ModalTop from "./ModalTop";
import ModalSupplyButton from "./button/ModalSupplyButton";
import ModalBorrowButton from "./button/ModalBorrowButton";
import ModalWithdrawButton from "./button/ModalWithdrawButton";
import ModalRepayButton from "./button/ModalRepayButton";
import ModalSupplyAmount from "./amount/ModalSupplyAmount";

import ModalWithdrawAmount from "./amount/ModalWithdrawAmount";
import ModalRepayAmount from "./amount/ModalRepayAmount";
import ModalBorrowAmount from "./amount/ModalBorrowAmount";

interface item {
  name: string;
  ratio: string;
}

interface Content {
  name: string;
  content: Array<item>;
}
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: Content;
  cryptoImg: string;
  cryptoName: string;
  max: string;
  account: string;
}

export default function Modal({
  setOpen,
  item,
  cryptoImg,
  cryptoName,
  max,
  account,
}: Props) {
  const [amount, setAmount] = useState("");

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex h-full w-full flex-col items-center justify-center ">
          <ModalHeader setOpen={setOpen} name={item && item.name} />
          <ModalMain>
            <div>
              <ModalTop
                content={item && item.content}
                cryptoImg={cryptoImg}
                cryptoName={cryptoName}
              />
            </div>
            <div className="mt-5">
              {item.name === "Supply" ? (
                <ModalSupplyAmount
                  setAmount={setAmount}
                  amount={amount}
                  max={max}
                  account={account}
                />
              ) : item.name === "Withdraw" ? (
                <ModalWithdrawAmount
                  setAmount={setAmount}
                  amount={amount}
                  max={max}
                  account={account}
                />
              ) : item.name === "Borrow" ? (
                <ModalBorrowAmount
                  setAmount={setAmount}
                  amount={amount}
                  max={max}
                  account={account}
                />
              ) : (
                <ModalRepayAmount
                  setAmount={setAmount}
                  amount={amount}
                  max={max}
                  account={account}
                />
              )}
            </div>
            {item && item.name === "Supply" ? (
              <div className="mt-5">
                <ModalSupplyButton
                  amount={amount}
                  setOpen={setOpen}
                  cryptoName={cryptoName}
                  max={max}
                  account={account}
                />
              </div>
            ) : item && item.name === "Withdraw" ? (
              <div className="mt-5">
                <ModalWithdrawButton
                  amount={amount}
                  setOpen={setOpen}
                  cryptoName={cryptoName}
                  max={max}
                  account={account}
                />
              </div>
            ) : item && item.name === "Borrow" ? (
              <div className="mt-5">
                <ModalBorrowButton
                  amount={amount}
                  setOpen={setOpen}
                  cryptoName={cryptoName}
                  max={max}
                  account={account}
                />
              </div>
            ) : (
              <div className="mt-5">
                <ModalRepayButton
                  amount={amount}
                  setOpen={setOpen}
                  cryptoName={cryptoName}
                  max={max}
                  account={account}
                />
              </div>
            )}
          </ModalMain>
        </div>
      </div>
    </div>
  );
}
