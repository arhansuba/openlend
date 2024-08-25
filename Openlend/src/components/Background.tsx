import { PropsWithChildren } from "react";

export default function Background({ children }: PropsWithChildren) {
  return (
    <div className=" fixed -left-2 -top-2 h-[101%] w-[101%] overflow-auto bg-[#151515]">
      {children}
    </div>
  );
}
