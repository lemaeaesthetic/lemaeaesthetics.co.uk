import React from "react";
import type { NextPage } from "next";
import pages from "config/data/page.data";
import Meta from "components/Meta/Meta.component";
import Image from "next/image";
import logo from "public/making-stuffs-logo-new-150.png";

const Home: NextPage = () => {
  return (
    <div>
      <Meta
        title={pages.homePage.title}
        description={pages.homePage.description}
        favicon={pages.homePage.favicon}
        url={pages.homePage.slug}
      />
      <main>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100vw",
          }}
        >
          <Image src={logo} width={75} height={75} layout="fixed" />
          <h1 style={{ color: "#f2f2f2", marginBottom: 0 }}>Next JS Starter</h1>
          <p style={{ color: "#f2f2f2" }}>Happy building!</p>
        </div>
      </main>
      <footer />
    </div>
  );
};

export default Home;
