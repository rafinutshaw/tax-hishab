import React from "react";
import type { AppProps } from "next/app";
import "../styles/default.css";
import "../styles/global.css";
import "../styles/app.css";
import Layout from "./layout";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
