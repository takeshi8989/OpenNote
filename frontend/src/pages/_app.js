import "../styles/global.css";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "@/components/header/Header";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAtom } from "jotai/react";
import { isLoggedInAtom, usernameAtom } from "@/jotai/authAtom";

export default function MyApp({ Component, pageProps }) {
  const { checkIsLoggedIn } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  useEffect(() => {
    if (checkIsLoggedIn()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (localStorage.getItem("username") != null) {
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  return (
    <NextUIProvider>
      <Header />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
