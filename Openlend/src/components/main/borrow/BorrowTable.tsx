import { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import BorrowTableData from "./BorrowTableData";
import BorrowTableField from "./BorrowTableField";
import { name } from "@/apis/common";
import {
  AAVEBorrowTotal,
  DAIBorrowTotal,
  EURSBorrowTotal,
  LINKBorrowTotal,
  USDCBorrowTotal,
  USDTBorrowTotal,
  WBTCBorrowTotal,
  WETHBorrowTotal,
} from "@/apis/borrowTotal";
import {
  AAVEBorrowAPY,
  DAIBorrowAPY,
  EURSBorrowAPY,
  LINKBorrowAPY,
  USDCBorrowAPY,
  USDTBorrowAPY,
  WBTCBorrowAPY,
  WETHBorrowAPY,
} from "@/apis/borrowAPY";
import {
  AAVESupplyTotal,
  DAISupplyTotal,
  EURSSupplyTotal,
  LINKSupplyTotal,
  USDCSupplyTotal,
  USDTSupplyTotal,
  WBTCSupplyTotal,
  WETHSupplyTotal,
} from "@/apis/supplyTotal";
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
  AAVEMaxLTV,
  DAIMaxLTV,
  EURSMaxLTV,
  LINKMaxLTV,
  USDCMaxLTV,
  USDTMaxLTV,
  WBTCMaxLTV,
  WETHMaxLTV,
} from "@/apis/maxLTV";

interface Props {
  allMarket: boolean;
  account: string;
}

const tableRow = [
  "Asset",
  "Total Borrow",
  "Borrow APY",
  "",
  "Borrow&Repay",
  "My Status/LTV",
  "Available Liquidity",
];

export default function BorrowTable({ allMarket, account }: Props) {
  const [openBorrow, setOpenBorrow] = useState(false);
  const [openRepay, setOpenRepay] = useState(false);
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoImg, setCryptoImg] = useState("");
  const [balance, setBalance] = useState("0");
  const [borrowAmount, setBorrowAmount] = useState("0");
  const [borrowableAmount, setBorrowableAmount] = useState("0");
  const [daiTotalBalance, setDaiTotalBalance] = useState("0");
  const [usdtTotalBalance, setUsdtTotalBalance] = useState("0");
  const [usdcTotalBalance, setUsdcTotalBalance] = useState("0");
  const [wbtcTotalBalance, setWbtcTotalBalance] = useState("0");
  const [linkTotalBalance, setLinkTotalBalance] = useState("0");
  const [aaveTotalBalance, setAaveTotalBalance] = useState("0");
  const [eursTotalBalance, setEursTotalBalance] = useState("0");
  const [wethTotalBalance, setWethTotalBalance] = useState("0");

  const [daiBorrowAPY, setDaiBorrowAPY] = useState("0%");
  const [usdtBorrowAPY, setUsdtBorrowAPY] = useState("0%");
  const [usdcBorrowAPY, setUsdcBorrowAPY] = useState("0%");
  const [wbtcBorrowAPY, setWbtcBorrowAPY] = useState("0%");
  const [linkBorrowAPY, setLinkBorrowAPY] = useState("0%");
  const [aaveBorrowAPY, setAaveBorrowAPY] = useState("0%");
  const [eursBorrowAPY, setEursBorrowAPY] = useState("0%");
  const [wethBorrowAPY, setWethBorrowAPY] = useState("0%");

  const [daiTotalSupplied, setDaiTotalSupplied] = useState("0");
  const [usdtTotalSupplied, setUsdtTotalSupplied] = useState("0");
  const [usdcTotalSupplied, setUsdcTotalSupplied] = useState("0");
  const [wbtcTotalSupplied, setWbtcTotalSupplied] = useState("0");
  const [linkTotalSupplied, setLinkTotalSupplied] = useState("0");
  const [aaveTotalSupplied, setAaveTotalSupplied] = useState("0");
  const [eursTotalSupplied, setEursTotalSupplied] = useState("0");
  const [wethTotalSupplied, setWethTotalSupplied] = useState("0");

  const [daiBalance, setDaiBalance] = useState("0");
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [usdcBalance, setUsdcBalance] = useState("0");
  const [wbtcBalance, setWbtcBalance] = useState("0");
  const [linkBalance, setLinkBalance] = useState("0");
  const [aaveBalance, setAaveBalance] = useState("0");
  const [eursBalance, setEursBalance] = useState("0");
  const [wethBalance, setWethBalance] = useState("0");

  const [daiMaxLTV, setDaiMaxLTV] = useState("0%");
  const [usdtMaxLTV, setUsdtMaxLTV] = useState("0%");
  const [usdcMaxLTV, setUsdcMaxLTV] = useState("0%");
  const [wbtcMaxLTV, setWbtcMaxLTV] = useState("0%");
  const [linkMaxLTV, setLinkMaxLTV] = useState("0%");
  const [aaveMaxLTV, setAaveMaxLTV] = useState("0%");
  const [eursMaxLTV, setEursMaxLTV] = useState("0%");
  const [wethMaxLTV, setWethMaxLTV] = useState("0%");

  const [apy, setAPY] = useState("0%");

  const tableCol = [
    [
      "ETH.png",
      "DAI",
      daiTotalBalance,
      daiBorrowAPY,
      daiBalance + " / " + daiMaxLTV,
      daiTotalSupplied,
    ],
    [
      "ETH.png",
      "USDT",
      usdtTotalBalance,
      usdtBorrowAPY,
      usdtBalance + " / " + usdtMaxLTV,
      usdtTotalSupplied,
    ],
    [
      "usdc.png",
      "USDC",
      usdcTotalBalance,
      usdcBorrowAPY,
      usdcBalance + " / " + usdcMaxLTV,
      usdcTotalSupplied,
    ],
    // ["eth.png", "ETH", "0.000", "0.00%", "0.00%", "00.00"],
    [
      "wbtc.png",
      "WBTC",
      wbtcTotalBalance,
      wbtcBorrowAPY,
      wbtcBalance + " / " + wbtcMaxLTV,
      wbtcTotalSupplied,
    ],
    [
      "ETH.png",
      "LINK",
      linkTotalBalance,
      linkBorrowAPY,
      linkBalance + " / " + linkMaxLTV,
      linkTotalSupplied,
    ],
    [
      "ETH.png",
      "AAVE",
      aaveTotalBalance,
      aaveBorrowAPY,
      aaveBalance + " / " + aaveMaxLTV,
      aaveTotalSupplied,
    ],
    [
      "ETH.png",
      "EURS",
      eursTotalBalance,
      eursBorrowAPY,
      eursBalance + " / " + eursMaxLTV,
      eursTotalSupplied,
    ],
    [
      "ETH.png",
      "WETH",
      wethTotalBalance,
      wethBorrowAPY,
      wethBalance + " / " + wethMaxLTV,
      wethTotalSupplied,
    ],
  ];

  const borrow = {
    name: "Borrow",
    content: [
      { name: "Wallet Balance", ratio: balance },
      { name: "Borrowable Amount", ratio: borrowableAmount },
      { name: "APY", ratio: apy },
    ],
  };

  const repay = {
    name: "Repay",
    content: [
      { name: "My debt(Borrowed Amount)", ratio: borrowAmount },
      { name: "APY", ratio: apy },
    ],
  };

  const checkMaxLTV = async () => {
    DAIMaxLTV().then((item) => setDaiMaxLTV(item ?? "0%"));
    USDTMaxLTV().then((item) => setUsdtMaxLTV(item ?? "0%"));
    USDCMaxLTV().then((item) => setUsdcMaxLTV(item ?? "0%"));
    WBTCMaxLTV().then((item) => setWbtcMaxLTV(item ?? "0%"));
    LINKMaxLTV().then((item) => setLinkMaxLTV(item ?? "0%"));
    AAVEMaxLTV().then((item) => setAaveMaxLTV(item ?? "0%"));
    EURSMaxLTV().then((item) => setEursMaxLTV(item ?? "0%"));
    WETHMaxLTV().then((item) => setWethMaxLTV(item ?? "0%"));
  };

  const checkBalance = async (account: string) => {
    DAIBalance(account).then((item) => setDaiBalance(item ?? "0"));
    USDTBalance(account).then((item) => setUsdtBalance(item ?? "0"));
    USDCBalance(account).then((item) => setUsdcBalance(item ?? "0"));
    WBTCBalance(account).then((item) => setWbtcBalance(item ?? "0"));
    LINKBalance(account).then((item) => setLinkBalance(item ?? "0"));
    AAVEBalance(account).then((item) => setAaveBalance(item ?? "0"));
    EURSBalance(account).then((item) => setEursBalance(item ?? "0"));
    WETHBalance(account).then((item) => setWethBalance(item ?? "0"));
  };

  const checkTotalSupply = async () => {
    DAISupplyTotal().then((item) => setDaiTotalSupplied(item ?? "0"));
    USDTSupplyTotal().then((item) => setUsdtTotalSupplied(item ?? "0"));
    USDCSupplyTotal().then((item) => setUsdcTotalSupplied(item ?? "0"));
    WBTCSupplyTotal().then((item) => setWbtcTotalSupplied(item ?? "0"));
    LINKSupplyTotal().then((item) => setLinkTotalSupplied(item ?? "0"));
    AAVESupplyTotal().then((item) => setAaveTotalSupplied(item ?? "0"));
    EURSSupplyTotal().then((item) => setEursTotalSupplied(item ?? "0"));
    WETHSupplyTotal().then((item) => setWethTotalSupplied(item ?? "0"));
  };

  const checkTotalBorrow = async () => {
    DAIBorrowTotal().then((item) => setDaiTotalBalance(item ?? "0"));
    USDTBorrowTotal().then((item) => setUsdtTotalBalance(item ?? "0"));
    USDCBorrowTotal().then((item) => setUsdcTotalBalance(item ?? "0"));
    WBTCBorrowTotal().then((item) => setWbtcTotalBalance(item ?? "0"));
    LINKBorrowTotal().then((item) => setLinkTotalBalance(item ?? "0"));
    AAVEBorrowTotal().then((item) => setAaveTotalBalance(item ?? "0"));
    EURSBorrowTotal().then((item) => setEursTotalBalance(item ?? "0"));
    WETHBorrowTotal().then((item) => setWethTotalBalance(item ?? "0"));
  };

  const checkBorrowAPY = async () => {
    DAIBorrowAPY().then((item) => setDaiBorrowAPY(item ?? "0%"));
    USDTBorrowAPY().then((item) => setUsdtBorrowAPY(item ?? "0%"));
    USDCBorrowAPY().then((item) => setUsdcBorrowAPY(item ?? "0%"));
    WBTCBorrowAPY().then((item) => setWbtcBorrowAPY(item ?? "0%"));
    LINKBorrowAPY().then((item) => setLinkBorrowAPY(item ?? "0%"));
    AAVEBorrowAPY().then((item) => setAaveBorrowAPY(item ?? "0%"));
    EURSBorrowAPY().then((item) => setEursBorrowAPY(item ?? "0%"));
    WETHBorrowAPY().then((item) => setWethBorrowAPY(item ?? "0%"));
  };

  const choiceBorrowAPY = (cryptoName: string) => {
    if (cryptoName === name[0]) {
      setAPY(daiBorrowAPY);
    } else if (cryptoName === name[1]) {
      setAPY(usdtBorrowAPY);
    } else if (cryptoName === name[2]) {
      setAPY(usdcBorrowAPY);
    } else if (cryptoName === name[3]) {
      setAPY(wbtcBorrowAPY);
    } else if (cryptoName === name[4]) {
      setAPY(linkBorrowAPY);
    } else if (cryptoName === name[5]) {
      setAPY(aaveBorrowAPY);
    } else if (cryptoName === name[6]) {
      setAPY(eursBorrowAPY);
    } else {
      setAPY(wethBorrowAPY);
    }
  };

  const choiceBalance = async (cryptoName: string) => {
    if (cryptoName === name[0]) {
      setBalance(daiBalance);
    } else if (cryptoName === name[1]) {
      setBalance(usdtBalance);
    } else if (cryptoName === name[2]) {
      setBalance(usdcBalance);
    } else if (cryptoName === name[3]) {
      setBalance(wbtcBalance);
    } else if (cryptoName === name[4]) {
      setBalance(linkBalance);
    } else if (cryptoName === name[5]) {
      setBalance(aaveBalance);
    } else if (cryptoName === name[6]) {
      setBalance(eursBalance);
    } else {
      setBalance(wethBalance);
    }
  };

  useEffect(() => {
    if (account) {
      checkTotalBorrow();
      checkBorrowAPY();

      checkTotalSupply();
      checkBalance(account);
      checkMaxLTV();
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      choiceBorrowAPY(cryptoName);
      choiceBalance(cryptoName);
    }
  }, [cryptoName, account]);

  return (
    <div className="w-full  ">
      <table className="table w-full px-20 text-center">
        <thead className="">
          <BorrowTableField tableRow={tableRow} />
        </thead>
        <tbody>
          <BorrowTableData
            tableCol={tableCol}
            setOpenBorrow={setOpenBorrow}
            setOpenRepay={setOpenRepay}
            allMarket={allMarket}
            setCryptoName={setCryptoName}
            setCryptoImg={setCryptoImg}
            setBorrowAmount={setBorrowAmount}
            setBorrowableAmount={setBorrowableAmount}
            account={account}
          />
        </tbody>
      </table>
      {openBorrow && (
        <Modal
          setOpen={setOpenBorrow}
          item={borrow}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={borrowableAmount}
          account={account}
        />
      )}
      {openRepay && (
        <Modal
          setOpen={setOpenRepay}
          item={repay}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={borrowAmount}
          account={account}
        />
      )}
    </div>
  );
}
