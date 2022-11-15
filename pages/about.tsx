import React from "react";
import type { NextPage } from "next";
import pages from "config/data/page.data";
import Meta from "components/Meta/Meta.component";

const About: NextPage = () => {
  return (
    <div>
      <Meta
        title={pages.aboutPage.title}
        description={pages.aboutPage.description}
        favicon={pages.aboutPage.favicon}
        url={pages.aboutPage.slug}
      />
      <main />
      <footer />
    </div>
  );
};
export default About;
