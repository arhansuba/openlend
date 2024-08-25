import { useSDK } from "@metamask/sdk-react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import saveAddress from "@/apis/saveAddress";

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string>>;
}
export default function ConnectWalletButton({ setAccount }: Props) {
  const { sdk, connected, connecting, account } = useSDK();

  const save = useMutation({
    mutationFn: saveAddress,
  });

  useEffect(() => {
    if (connected) {
      localStorage.setItem("account", account || "");
      setAccount(account || "");

      save.mutate(account || "");
    }
  }, [connected, account]);

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setAccount("");
    }
  };

  return (
    <div className="relative">
      {connected ? (
        <button
          className="mr-4 items-center rounded-full bg-[#252a39] px-5 py-2"
          // onClick={disconnect}
        >
          <div className="flex font-montserrat  text-[16px]  font-semibold leading-[24px] text-white">
            <img src="metamask.png" className="mr-2 mt-1 h-4 w-4" />
            {account}
          </div>
        </button>
      ) : (
        <button
          className="mr-4 items-center rounded-full bg-[#252a39] px-5 py-2"
          disabled={connecting}
          onClick={connect}
        >
          <div className="flex font-montserrat  text-[16px]  font-semibold leading-[24px] text-white">
            <img src="metamask.png" className="mr-2 mt-1 h-4 w-4" />
          </div>
        </button>
      )}
    </div>
  );
}
