import { useEffect, useState } from "react";
import Account from "./Account";
import Table from "./Table";
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
  AAVELiquidation,
  DAILiquidation,
  EURSLiquidation,
  LINKLiquidation,
  USDCLiquidation,
  USDTLiquidation,
  WBTCLiquidation,
  WETHLiquidation,
} from "@/apis/liquidation";
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
const tableRow = ["Asset", "Borrowed", "APY", "MAXLTV", "LIQUIDATION"];
export default function Borrow({ account }: Props) {
  const [balance, setBalance] = useState(0);
  const [tableCol, setTableCol] = useState<any>([]);
  useEffect(() => {
    if (account) {
      checkMyBorrow(account);
    }
  }, []);

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
      const apy = await DAIBorrowAPY();
      const ltv = await DAIMaxLTV();
      const liquidataion = await DAILiquidation(account);

      const item = ["ETH.png", "DAI", dai, apy, ltv, liquidataion];
      list.push(item);
    }
    if (parseFloat(usdt) > 0) {
      const apy = await USDTBorrowAPY();
      const ltv = await USDTMaxLTV();
      const liquidataion = await USDTLiquidation(account);
      const item = ["ETH.png", "USDT", usdt, apy, ltv, liquidataion];
      list.push(item);
    }
    if (parseFloat(usdc) > 0) {
      const apy = await USDCBorrowAPY();
      const ltv = await USDCMaxLTV();
      const liquidataion = await USDCLiquidation(account);
      const item = ["usdc.png", "USDC", usdc, apy, ltv, liquidataion];
      list.push(item);
    }

    if (parseFloat(wbtc) > 0) {
      const apy = await WBTCBorrowAPY();
      const ltv = await WBTCMaxLTV();
      const liquidataion = await WBTCLiquidation(account);
      const item = ["wbtc.png", "WBTC", wbtc, apy, ltv, liquidataion];
      list.push(item);
    }

    if (parseFloat(link) > 0) {
      const apy = await LINKBorrowAPY();
      const ltv = await LINKMaxLTV();
      const liquidataion = await LINKLiquidation(account);
      const item = ["ETH.png", "LINK", link, apy, ltv, liquidataion];
      list.push(item);
    }

    if (parseFloat(aave) > 0) {
      const apy = await AAVEBorrowAPY();
      const ltv = await AAVEMaxLTV();
      const liquidataion = await AAVELiquidation(account);
      const item = ["ETH.png", "AAVE", aave, apy, ltv, liquidataion];
      list.push(item);
    }

    if (parseFloat(eurs) > 0) {
      const apy = await EURSBorrowAPY();
      const ltv = await EURSMaxLTV();
      const liquidataion = await EURSLiquidation(account);
      const item = ["ETH.png", "EURS", eurs, apy, ltv, liquidataion];
      list.push(item);
    }

    if (parseFloat(weth) > 0) {
      const apy = await WETHBorrowAPY();
      const ltv = await WETHMaxLTV();
      const liquidataion = await WETHLiquidation(account);
      const item = ["ETH.png", "WETH", weth, apy, ltv, liquidataion];
      list.push(item);
    }

    setTableCol(list);
  };

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-lg">
      <div className="bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] px-4 pb-7 pt-5">
        <div className="flex justify-between ">
          <div className="font-montserrat text-[18px] leading-[20px] text-[#CDD9C9]">
            Borrow
          </div>
          <div className="font-pretendard text-[18px] leading-[20px] text-[#B0B0B0]">
            Balance : ${balance}
          </div>
        </div>
      </div>
      <Account>
        <Table tableRow={tableRow} tableCol={tableCol} flag={true} />
      </Account>
    </div>
  );
}
