import { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import {
  aave_contract,
  aave_oracle_contract,
  dai_address,
  dai_contract,
  name,
  pool_contract,
  pool_data_provider_contract,
  usdc_contract,
  usdt_contract,
  wbtc_address,
  wbtc_contract,
  weth_address,
  weth_contract,
} from "../../../apis/common";
import SupplyTableField from "./SupplyTableField";
import SupplyTableData from "./SupplyTableData";

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
  AAVEMySupplyRatio,
  DAIMySupplyRatio,
  EURSMySupplyRatio,
  LINKMySupplyRatio,
  USDCMySupplyRatio,
  USDTMySupplyRatio,
  WBTCMySupplyRatio,
  WETHMySupplyRatio,
} from "@/apis/supplyRatio";
import {
  AAVESupplyAPY,
  DAISupplyAPY,
  EURSSupplyAPY,
  LINKSupplyAPY,
  USDCSupplyAPY,
  USDTSupplyAPY,
  WBTCSupplyAPY,
  WETHSupplyAPY,
} from "@/apis/supplyAPY";
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
  AAVEMySupplyBalance,
  DAIMySupplyBalance,
  EURSMySupplyBalance,
  LINKMySupplyBalance,
  USDCMySupplyBalance,
  USDTMySupplyBalance,
  WBTCMySupplyBalance,
  WETHMySupplyBalance,
} from "@/apis/mySupplyBalance";
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
import { normalize, valueToBigNumber } from "@/apis/bignumber";
import BigNumber from "bignumber.js";
import saveAddress from "@/apis/saveAddress";
import { useMutation } from "react-query";
import axios from "axios";

interface Props {
  allMarket: boolean;
  account: string;
}

const tableRow = [
  "Asset",
  "Total Supplied",
  "APY/LTV",
  "Available",
  "",
  "Supply&Withdraw",
  "Supplied",
];

export default function SupplyTable({ allMarket, account }: Props) {
  const [openSupply, setOpenSupply] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoImg, setCryptoImg] = useState("");
  const [balance, setBalance] = useState("0");
  const [mySupply, setMySupply] = useState("0");
  const [maxLTV, setMaxLTV] = useState("0%");
  const [apy, setAPY] = useState("0%");
  const [max, setMax] = useState("0");

  const [daiTotalSupplied, setDaiTotalSupplied] = useState("0");
  const [usdtTotalSupplied, setUsdtTotalSupplied] = useState("0");
  const [usdcTotalSupplied, setUsdcTotalSupplied] = useState("0");
  const [wbtcTotalSupplied, setWbtcTotalSupplied] = useState("0");
  const [linkTotalSupplied, setLinkTotalSupplied] = useState("0");
  const [aaveTotalSupplied, setAaveTotalSupplied] = useState("0");
  const [eursTotalSupplied, setEursTotalSupplied] = useState("0");
  const [wethTotalSupplied, setWethTotalSupplied] = useState("0");

  const [daiMaxLTV, setDaiMaxLTV] = useState("0%");
  const [usdtMaxLTV, setUsdtMaxLTV] = useState("0%");
  const [usdcMaxLTV, setUsdcMaxLTV] = useState("0%");
  const [wbtcMaxLTV, setWbtcMaxLTV] = useState("0%");
  const [linkMaxLTV, setLinkMaxLTV] = useState("0%");
  const [aaveMaxLTV, setAaveMaxLTV] = useState("0%");
  const [eursMaxLTV, setEursMaxLTV] = useState("0%");
  const [wethMaxLTV, setWethMaxLTV] = useState("0%");

  const [daiSupply, setDaiSupply] = useState("0%");
  const [usdtSupply, setUsdtSupply] = useState("0%");
  const [usdcSupply, setUsdcSupply] = useState("0%");
  const [wbtcSupply, setWbtcSupply] = useState("0%");
  const [linkSupply, setLinkSupply] = useState("0%");
  const [aaveSupply, setAaveSupply] = useState("0%");
  const [eursSupply, setEursSupply] = useState("0%");
  const [wethSupply, setWethSupply] = useState("0%");

  const [daiSupplyAPY, setDaiSupplyAPY] = useState("0%");
  const [usdtSupplyAPY, setUsdtSupplyAPY] = useState("0%");
  const [usdcSupplyAPY, setUsdcSupplyAPY] = useState("0%");
  const [wbtcSupplyAPY, setWbtcSupplyAPY] = useState("0%");
  const [linkSupplyAPY, setLinkSupplyAPY] = useState("0%");
  const [aaveSupplyAPY, setAaveSupplyAPY] = useState("0%");
  const [eursSupplyAPY, setEursSupplyAPY] = useState("0%");
  const [wethSupplyAPY, setWethSupplyAPY] = useState("0%");

  const [daiBalance, setDaiBalance] = useState("0");
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [usdcBalance, setUsdcBalance] = useState("0");
  const [wbtcBalance, setWbtcBalance] = useState("0");
  const [linkBalance, setLinkBalance] = useState("0");
  const [aaveBalance, setAaveBalance] = useState("0");
  const [eursBalance, setEursBalance] = useState("0");
  const [wethBalance, setWethBalance] = useState("0");

  const supply = {
    name: "Supply",
    content: [
      { name: "Wallet Balance", ratio: balance },
      { name: "Amount Supplied", ratio: mySupply },
      { name: "APY", ratio: apy },
      { name: "Max LTV", ratio: maxLTV },
    ],
  };

  const withdraw = {
    name: "Withdraw",
    content: [
      { name: "My Supply", ratio: mySupply },
      { name: "APY", ratio: apy },
    ],
  };

  const tableCol = [
    [
      "ETH.png",
      "DAI",
      daiTotalSupplied,
      daiSupplyAPY + " / " + daiMaxLTV,
      daiBalance,
      daiSupply,
    ],
    [
      "ETH.png",
      "USDT",
      usdtTotalSupplied,
      usdtSupplyAPY + " / " + usdtMaxLTV,
      usdtBalance,
      usdtSupply,
    ],
    [
      "usdc.png",
      "USDC",
      usdcTotalSupplied,
      usdcSupplyAPY + " / " + usdcMaxLTV,
      usdcBalance,
      usdcSupply,
    ],
    // ["eth.png", "ETH", "0.000", "0.00%", "0.00%", "00.00"],
    [
      "wbtc.png",
      "WBTC",
      wbtcTotalSupplied,
      wbtcSupplyAPY + " / " + wbtcMaxLTV,
      wbtcBalance,
      wbtcSupply,
    ],
    [
      "ETH.png",
      "LINK",
      linkTotalSupplied,
      linkSupplyAPY + " / " + linkMaxLTV,
      linkBalance,
      linkSupply,
    ],
    [
      "ETH.png",
      "AAVE",
      aaveTotalSupplied,
      aaveSupplyAPY + " / " + aaveMaxLTV,
      aaveBalance,
      aaveSupply,
    ],
    [
      "ETH.png",
      "EURS",
      eursTotalSupplied,
      eursSupplyAPY + " / " + eursMaxLTV,
      eursBalance,
      eursSupply,
    ],
    [
      "ETH.png",
      "WETH",
      wethTotalSupplied,
      wethSupplyAPY + " / " + wethMaxLTV,
      wethBalance,
      wethSupply,
    ],
  ];
  const save = useMutation({
    mutationFn: saveAddress,
  });

  const test = async () => {
    await axios.patch(
      `http://101.101.211.232:3000/lending/0xd5F0f8BDAe817C40fdb5209566efDc27BB6b4174`,
      {
        deposit: 1,
        borrow: 2,
        referral: 11,
        total: 1,
        referralLink: "aaaa",
      },
    );
    // const user = await pool_contract.methods.getUserAccountData(account).call();

    // const price = await aave_oracle_contract.methods
    //   .getAssetPrice(wbtc_address)
    //   .call();

    // let maxCollateralToWithdrawInETH = valueToBigNumber("0");
    // const healthFactor =
    //   parseInt(user["healthFactor"]) / parseInt("1000000000000000000");

    // const excessHF = valueToBigNumber(healthFactor).minus("1.01");

    // if (excessHF.gt("0")) {
    //   maxCollateralToWithdrawInETH = excessHF
    //     .multipliedBy(parseInt(user["totalDebtBase"]) / 100000000)
    //     .div(parseInt(user["currentLiquidationThreshold"]) / 1000);
    // }

    // const max = maxCollateralToWithdrawInETH.dividedBy(
    //   parseInt(price) / 1000000000,
    // );

    // const result = max.toString(10);
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

  const checkSupply = async (account: string) => {
    DAIMySupplyBalance(account).then((item) => setDaiSupply(item ?? "0"));
    USDTMySupplyBalance(account).then((item) => setUsdtSupply(item ?? "0"));
    USDCMySupplyBalance(account).then((item) => setUsdcSupply(item ?? "0"));
    WBTCMySupplyBalance(account).then((item) => setWbtcSupply(item ?? "0"));
    LINKMySupplyBalance(account).then((item) => setLinkSupply(item ?? "0"));
    AAVEMySupplyBalance(account).then((item) => setAaveSupply(item ?? "0"));
    EURSMySupplyBalance(account).then((item) => setEursSupply(item ?? "0"));
    WETHMySupplyBalance(account).then((item) => setWethSupply(item ?? "0"));
  };

  const checkSupplyAPY = async () => {
    DAISupplyAPY().then((item) => setDaiSupplyAPY(item ?? "0%"));
    USDTSupplyAPY().then((item) => setUsdtSupplyAPY(item ?? "0%"));
    USDCSupplyAPY().then((item) => setUsdcSupplyAPY(item ?? "0%"));
    WBTCSupplyAPY().then((item) => setWbtcSupplyAPY(item ?? "0%"));
    LINKSupplyAPY().then((item) => setLinkSupplyAPY(item ?? "0%"));
    AAVESupplyAPY().then((item) => setAaveSupplyAPY(item ?? "0%"));
    EURSSupplyAPY().then((item) => setEursSupplyAPY(item ?? "0%"));
    WETHSupplyAPY().then((item) => setWethSupplyAPY(item ?? "0%"));
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

  const choiceMaxLTV = (cryptoName: string) => {
    if (cryptoName === name[0]) {
      setMaxLTV(daiMaxLTV);
    } else if (cryptoName === name[1]) {
      setMaxLTV(usdtMaxLTV);
    } else if (cryptoName === name[2]) {
      setMaxLTV(usdcMaxLTV);
    } else if (cryptoName === name[3]) {
      setMaxLTV(wbtcMaxLTV);
    } else if (cryptoName === name[4]) {
      setMaxLTV(linkMaxLTV);
    } else if (cryptoName === name[5]) {
      setMaxLTV(aaveMaxLTV);
    } else if (cryptoName === name[6]) {
      setMaxLTV(eursMaxLTV);
    } else {
      setMaxLTV(wethMaxLTV);
    }
  };

  const choiceAPY = (cryptoName: string) => {
    if (cryptoName === name[0]) {
      setAPY(daiSupplyAPY);
    } else if (cryptoName === name[1]) {
      setAPY(usdtSupplyAPY);
    } else if (cryptoName === name[2]) {
      setAPY(usdcSupplyAPY);
    } else if (cryptoName === name[3]) {
      setAPY(wbtcSupplyAPY);
    } else if (cryptoName === name[4]) {
      setAPY(linkSupplyAPY);
    } else if (cryptoName === name[5]) {
      setAPY(aaveSupplyAPY);
    } else if (cryptoName === name[6]) {
      setAPY(eursSupplyAPY);
    } else {
      setAPY(wethSupplyAPY);
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

  const choiceSupply = async (cryptoName: string) => {
    if (cryptoName === name[0]) {
      setMySupply(daiSupply);
    } else if (cryptoName === name[1]) {
      setMySupply(usdtSupply);
    } else if (cryptoName === name[2]) {
      setMySupply(usdcSupply);
    } else if (cryptoName === name[3]) {
      setMySupply(wbtcSupply);
    } else if (cryptoName === name[4]) {
      setMySupply(linkSupply);
    } else if (cryptoName === name[5]) {
      setMySupply(aaveSupply);
    } else if (cryptoName === name[6]) {
      setMySupply(eursSupply);
    } else {
      setMySupply(wbtcBalance);
    }
  };

  useEffect(() => {
    if (account) {
      test();
      checkTotalSupply();
      checkMaxLTV();
      checkBalance(account);
      checkSupplyAPY();
      checkSupply(account);
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      choiceMaxLTV(cryptoName);
      choiceAPY(cryptoName);
      choiceSupply(cryptoName);
      choiceBalance(cryptoName);
    }
  }, [cryptoName, account]);

  return (
    <div className="w-full ">
      <table className="table w-full px-20 text-center">
        <thead className="">
          <SupplyTableField tableRow={tableRow} />
        </thead>
        <tbody>
          <SupplyTableData
            tableCol={tableCol}
            setOpenSupply={setOpenSupply}
            setOpenWithdraw={setOpenWithdraw}
            allMarket={allMarket}
            setCryptoName={setCryptoName}
            setCryptoImg={setCryptoImg}
            setMax={setMax}
            account={account}
          />
        </tbody>
      </table>
      {openSupply && (
        <Modal
          setOpen={setOpenSupply}
          item={supply}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={max}
          account={account}
        />
      )}
      {openWithdraw && (
        <Modal
          setOpen={setOpenWithdraw}
          item={withdraw}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={mySupply}
          account={account}
        />
      )}
    </div>
  );
}
