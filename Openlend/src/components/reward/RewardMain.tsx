import Table from "./Table";

export const total = "Points refresh every 24 hours";
export const supply = "Supply earns 1 point per dollar deposit per day";
export const borrow = "Borrowing earns 4 points per dollar borrowed per day";
export const referral = "Earn 10% of the points any user you refer earns";

export default function RewardMain() {
  return (
    <div className=" mt-20  flex flex-col  items-center justify-center ">
      <div className="font-montserrat  text-[30px] font-bold leading-[45px] text-[white]">
        Reward
      </div>
      <div className="mt-5 flex  w-full items-center justify-center gap-10">
        <div className="flex h-[132px] w-[640px] flex-col justify-center rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%]  p-6  ">
          <div className="flex items-center gap-1">
            <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
              Total Points
            </div>
            <div className="tooltip  tooltip-right" data-tip={total}>
              <img src={"ol-details-so.png"} className="h-[14px] w-[14px] " />
            </div>
          </div>
          <div className="mt-2 font-montserrat text-[30px] leading-[20px] text-white ">
            00.00
          </div>
        </div>
        <div className="flex h-[132px] w-[300px] flex-col justify-center rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%]  p-6 ">
          <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
            Global Rank
          </div>

          <div className="mt-2 font-montserrat text-[30px] leading-[20px] text-white">
            #00,00
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-center gap-6">
        <div className="flex h-[132px] w-[200px] flex-col justify-center rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%]  p-6 ">
          <div className="flex items-center gap-1">
            <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
              Supply Points
            </div>
            <div className="tooltip  tooltip-right" data-tip={supply}>
              <img src={"ol-details-so.png"} className="h-[14px] w-[14px] " />
            </div>
          </div>
          <div className="mt-2 font-montserrat text-[24px] leading-[20px] text-white">
            00.00
          </div>
        </div>
        <div className="flex h-[132px] w-[200px] flex-col justify-center rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%]  p-6 ">
          <div className="flex items-center gap-1">
            <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
              Borrowing Points
            </div>

            <div className="tooltip  tooltip-right" data-tip={borrow}>
              <img src={"ol-details-so.png"} className="h-[14px] w-[14px] " />
            </div>
          </div>
          <div className="mt-2 font-montserrat text-[30px] leading-[20px] text-white">
            00.00
          </div>
        </div>
        <div className="flex h-[132px] w-[200px] flex-col justify-center rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%]  p-6 ">
          <div className="flex items-center gap-1">
            <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
              Referral Points
            </div>
            <div className="tooltip  tooltip-right" data-tip={referral}>
              <img src={"ol-details-so.png"} className="h-[14px] w-[14px] " />
            </div>
          </div>
          <div className="mt-2 font-montserrat text-[30px] leading-[20px] text-white">
            00.00
          </div>
        </div>
        <div className="ml-5 flex flex-col gap-5">
          <div className="flex h-[58px] w-[300px] flex-col items-center justify-center rounded-full bg-[#4A4A4A] p-6">
            <div className="font-montserrat text-[17px] leading-[20px] text-white">
              How do points works?
            </div>
          </div>
          <div className="flex h-[58px] w-[300px] flex-col items-center justify-center rounded-full bg-[#4A4A4A] p-6">
            <div className="font-montserrat text-[17px] leading-[20px] text-white">
              Copy referral link
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-9/12">
        <Table />
      </div>
    </div>
  );
}
