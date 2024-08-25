import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Account({ children }: Props) {
  return (
    <div className="relative -top-3 w-full max-w-lg rounded-lg border border-white bg-[#151515]">
      <div className=" flex w-full max-w-lg justify-between px-6 py-8 ">
        <div className="flex w-full flex-col ">{children}</div>
      </div>
    </div>
  );
}
