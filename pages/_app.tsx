import React from "react";
import type { AppProps } from "next/app";
import "styles/index.scss";
import { Provider } from "react-redux";
import { wrapper } from "services/redux/store";

const LeMaeAestheticsApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default LeMaeAestheticsApp;
