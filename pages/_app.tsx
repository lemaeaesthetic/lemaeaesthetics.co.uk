import React from "react";
import type { AppProps } from "next/app";
import "styles/index.scss";

const LeMaeAestheticsApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default LeMaeAestheticsApp;
