import { ReactNode, createContext, useContext, useState } from "react";


// jotai 대체를 위한 임시 context
export const TmpContext = createContext<{
  address: string | null;
  setAddress: (value: string) => void;
}>({ address: null, setAddress: () => {}});


// export const TmpContext = createContext<Tmp | undefined>(undefined)
export const useTmpContext = () => useContext(TmpContext);

export const TmpContextProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState("");


  return (
    <TmpContext.Provider value={{ address, setAddress }}>
      {children}
    </TmpContext.Provider>
  );
};
