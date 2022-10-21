import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return (
    <div className="app_page px-2">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
