import "../styles/global.css";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "@/components/header/Header";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function MyApp({ Component, pageProps }) {
  const [login, signup, isLoggedIn] = useAuth();
  useEffect(() => {
    if (isLoggedIn()) {
      console.log("set is logged in");
    }
  }, []);
  return (
    <NextUIProvider>
      <Header />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
