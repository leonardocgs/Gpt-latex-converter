import "@/styles/globals.css";
import { MathJaxContext } from "better-react-mathjax";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MathJaxContext>
      {" "}
      <Component {...pageProps} />
    </MathJaxContext>
  );
}
