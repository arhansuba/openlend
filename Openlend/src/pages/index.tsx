import Background from "../components/Background";
import Header from "../components/Header";
import Main from "../components/main/Main";
import { TmpContextProvider } from "../components/TmpContext";

export default function Home() {
  return (
    <TmpContextProvider>
      <Background>
        <Header />
        <Main />
      </Background>
    </TmpContextProvider>
  );
}
