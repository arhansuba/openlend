import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useTmpContext } from "@/components/TmpContext";
import saveAddress from "@/apis/saveAddress";

export default function ConnectButton() {
  const { address, setAddress } = useTmpContext();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      window.ethereum.on("accountsChanged", connectWallet);
      // window.ethereum.on("chainChanged", chainChanged);s
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      connect();
     
    }
  }, []);

  // const chainChanged = async () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     setAddress("");
  //   }
  // };

  const save = useMutation({
    mutationFn: saveAddress,
  });

  const connect = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const res: any = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAddress(res[0]);
        console.log('eee')
        if (!flag) {
          save.mutate(res[0]);
          setFlag(true);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const res: any = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAddress(res[0]);

        save.mutate(res[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Install Metamask");
    }
  };
  return (
    <div className="relative">
      <button
        className="mr-4 items-center rounded-full bg-[#252a39] px-5 py-2"
        onClick={connect}
      >
        <div className="flex font-montserrat  text-[16px]  font-semibold leading-[24px] text-white">
          <img src="metamask.png" className="mr-2 mt-1 h-4 w-4" />
          {address === "" ? "connect wallet" : address}
        </div>
      </button>
    </div>
  );
}
