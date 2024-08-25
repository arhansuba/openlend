interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}
export default function ModalHeader({ setOpen, name }: Props) {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white transition-all">
      <div className="bg-[#38B82D] px-4 pb-7 pt-5">
        <div className="flex justify-between">
          <div></div>
          <div className="font-pretendard text-[22px] font-extrabold leading-[26px] text-white">
            {name}
          </div>
          <button
            data-modal-hide="default-modal"
            className="text-white"
            onClick={() => setOpen(false)}
          >
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
