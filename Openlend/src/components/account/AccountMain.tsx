import Borrow from "./Borrow";
import Supply from "./Supply";
import { useTmpContext } from "@/components/TmpContext";

export default function AccountMain() {
  const { address } = useTmpContext();

  return (
    <div className=" mt-20  flex flex-col  items-center justify-center ">
      <div className="font-montserrat  text-[30px] font-bold leading-[45px] text-[white]">
        My Account
      </div>
      <div className="mt-10  flex items-center justify-center gap-10">
        <div className="w-[510px]">
          {address && <Supply account={address} />}
        </div>
        <div className="w-[510px]">
          {address && <Borrow account={address} />}
        </div>
      </div>
    </div>
  );
}
