import "@/styles/style.scss";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/login" ? <Header /> : null}
      <Component {...pageProps} />
    </>
  );
}
