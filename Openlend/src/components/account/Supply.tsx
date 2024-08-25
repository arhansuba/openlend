import { useEffect, useState } from "react";
import Account from "./Account";
import Table from "./Table";
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
  account: string;
}

const tableRow = ["Asset", "Supplied", "APY", "MAXLTV"];
export default function Supply({ account }: Props) {
  const [balance, setBalance] = useState(0);
  const [tableCol, setTableCol] = useState<any>([]);

  useEffect(() => {
    if (account) {
      checkMySupply(account);
    }
  }, [account]);

  const checkMySupply = async (account: string) => {
    const dai = await DAIMySupplyBalance(account);
    const usdt = await USDTMySupplyBalance(account);
    const usdc = await USDCMySupplyBalance(account);
    const wbtc = await WBTCMySupplyBalance(account);
    const link = await LINKMySupplyBalance(account);
    const aave = await AAVEMySupplyBalance(account);
    const eurs = await EURSMySupplyBalance(account);
    const weth = await WETHMySupplyBalance(account);

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

    const table = {
      dai: dai,
      usdc: usdc,
      usdt: usdt,
      wbtc: wbtc,
      link: link,
      aave: aave,
      eurs: eurs,
      weth: weth,
    };

    setTale(table);
  };

  const setTale = async (table: any) => {
    const dai = table.dai;
    const usdc = table.usdc;
    const usdt = table.usdt;
    const wbtc = table.wbtc;
    const link = table.link;
    const aave = table.aave;
    const eurs = table.eurs;
    const weth = table.weth;

    const list = [];

    if (parseFloat(dai) > 0) {
      const apy = await DAISupplyAPY();
      const ltv = await DAIMaxLTV();
      const item = ["ETH.png", "DAI", dai, apy, ltv];
      list.push(item);
    }
    if (parseFloat(usdt) > 0) {
      const apy = await USDTSupplyAPY();
      const ltv = await USDTMaxLTV();
      const item = ["ETH.png", "USDT", usdt, apy, ltv];
      list.push(item);
    }
    if (parseFloat(usdc) > 0) {
      const apy = await USDCSupplyAPY();
      const ltv = await USDCMaxLTV();
      const item = ["usdc.png", "USDC", usdc, apy, ltv];
      list.push(item);
    }
    if (parseFloat(wbtc) > 0) {
      const apy = await WBTCSupplyAPY();
      const ltv = await WBTCMaxLTV();
      const item = ["wbtc.png", "WBTC", wbtc, apy, ltv];
      list.push(item);
    }

    if (parseFloat(link) > 0) {
      const apy = await LINKSupplyAPY();
      const ltv = await LINKMaxLTV();
      const item = ["ETH.png", "LINK", link, apy, ltv];
      list.push(item);
    }

    if (parseFloat(aave) > 0) {
      const apy = await AAVESupplyAPY();
      const ltv = await AAVEMaxLTV();
      const item = ["ETH.png", "AAVE", aave, apy, ltv];
      list.push(item);
    }

    if (parseFloat(eurs) > 0) {
      const apy = await EURSSupplyAPY();
      const ltv = await EURSMaxLTV();
      const item = ["ETH.png", "EURS", eurs, apy, ltv];
      list.push(item);
    }

    if (parseFloat(weth) > 0) {
      const apy = await WETHSupplyAPY();
      const ltv = await WETHMaxLTV();
      const item = ["ETH.png", "WETH", weth, apy, ltv];
      list.push(item);
    }

    setTableCol(list);
  };
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-lg">
      <div className="bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] px-4 pb-7 pt-5">
        <div className="flex justify-between ">
          <div className="font-montserrat text-[18px] leading-[20px] text-[#CDD9C9]">
            Supply
          </div>
          <div className="font-pretendard text-[18px] leading-[20px] text-[#B0B0B0]">
            Balance : ${balance}
          </div>
        </div>
      </div>
      <Account>
        <Table tableRow={tableRow} tableCol={tableCol} flag={false} />
      </Account>
    </div>
  );
}
