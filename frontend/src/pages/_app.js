import "../styles/global.css";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "@/components/header/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Header />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
