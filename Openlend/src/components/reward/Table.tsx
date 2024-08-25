import { useQuery } from "react-query";
import getAllAddress from "@/apis/getAllAddress";

export default function Table() {
  const data = useQuery({
    queryKey: ["getAllAddress"],
    queryFn: getAllAddress,
  });

  return (
    <div className="w-full  ">
      <table className="table w-full px-20 text-center">
        <thead className="">
          <tr>
            <th className="font-pretendard text-[14px] font-bold leading-[24px] text-[#6A6A6A]">
              Rank
            </th>
            <th className="font-pretendard text-[14px] font-bold leading-[20px] text-[#B0B0B0]">
              Address
            </th>
            <th className="font-pretendard text-[14px] font-bold leading-[20px] text-[#6A6A6A]">
              Deposit Points
            </th>
            <th className="font-pretendard text-[14px] font-bold leading-[20px] text-[#6A6A6A]">
              Borrow Points
            </th>
            <th className="font-pretendard text-[14px] font-bold leading-[20px] text-[#6A6A6A]">
              Referral Points
            </th>
            <th className="font-pretendard text-[14px] font-bold leading-[20px] text-[#6A6A6A]">
              Total Points
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data?.map((item: any, index: number) =>
            item.address === "" ? null : (
              <tr key={index} className="rewardColum h-[60px] ">
                <td className="font-pretendard text-[14px] font-bold leading-[20px] text-[#B0B0B0]">
                  {item.rank}
                </td>
                <td className="font-pretendard text-[14px] font-bold leading-[20px] text-[#E1E3EA]">
                  {item.address}
                </td>
                <td className="font-pretendard text-[14px] font-bold leading-[20px] text-[#B0B0B0]">
                  {item.deposit}
                </td>
                <td className="font-pretendard text-[14px] font-bold leading-[20px] text-[#B0B0B0]">
                  {item.borrow}
                </td>
                <td className="font-pretendard text-[14px] font-bold leading-[20px] text-[#B0B0B0]">
                  {item.referral}
                </td>
                <td className="font-pretendard text-[14px] font-bold leading-[20px] text-[#B0B0B0]">
                  {item.total}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
