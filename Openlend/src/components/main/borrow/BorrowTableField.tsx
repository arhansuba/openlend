interface Props {
  tableRow: string[];
}

export default function BorrowTableField({ tableRow }: Props) {
  return (
    <>
      <tr>
        {tableRow &&
          tableRow.map((item: string, index: number) => (
            <th
              key={index}
              className={
                index === 4
                  ? `font-pretendard text-[14px] font-semibold leading-[20px] text-[#559465]`
                  : `font-pretendard text-[14px] font-semibold leading-[20px] text-[#525C52]`
              }
            >
              {item}
            </th>
          ))}
      </tr>
    </>
  );
}
