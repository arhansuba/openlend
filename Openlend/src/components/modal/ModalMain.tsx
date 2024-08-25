interface Props {
  children: React.ReactNode;
}

export default function ModalMain({ children }: Props) {
  return (
    <div className="relative -top-3 w-full max-w-lg rounded-lg border border-[#38B82D] bg-[#1B1B1B]">
      <div className=" flex w-full max-w-lg justify-between px-10 py-8">
        <div className="flex w-full flex-col">{children}</div>
      </div>
    </div>
  );
}
