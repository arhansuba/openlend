interface item {
  name: string;
  ratio: string;
}

interface Props {
  content: Array<item>;
  cryptoImg: string;
  cryptoName: string;
}
export default function ModalTop({ content, cryptoImg, cryptoName }: Props) {
  return (
    <div className="w-full rounded-[20px] bg-[#151615] p-6">
      <div className="mb-5 flex flex-col">
        <div className="flex">
          <img src={cryptoImg} className="mr-5 h-[68px] w-[68px]" />
          <div className="flex items-center justify-center font-pretendard text-[16px] font-bold  leading-[22px] text-[#BCE8B9]">
            {cryptoName}
          </div>
        </div>
        <div className=" mt-5 h-[1px] w-[390px] bg-[#1D1D1D]" />
      </div>

      <div className="flex flex-col text-white">
        {content &&
          content.map((item, index) => (
            <div key={index} className="mb-3 flex justify-between">
              <div>{item.name}</div>
              <div>{item.ratio}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
