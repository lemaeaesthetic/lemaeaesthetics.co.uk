import React, { useEffect } from "react";
import type { NextPage } from "next";
import pages from "config/data/page.data";
import { Meta } from "components/Meta/Meta";
import { NavMenu } from "components/Navigation/NavMenu";
import { selectPage } from "services/redux/pageSlice";
import { useAppSelector } from "services/redux/hooks";
import { Footer } from "components/Footer/Footer";
import { Sections } from "components/Sections/Sections";
import { fetchPageFromSlug } from "services/graphQl.service";

const NotFound: NextPage = () => {
  useEffect(() => {
    (async () => {
      try {
        const page = await fetchPageFromSlug("not-found", true);
        console.log(page);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const pageData = useAppSelector(selectPage());
  return (
    <div>
      <Meta
        title={pageData?.seoTitle || pageData.title}
        description={pageData.seoDescription || ""}
        favicon={pages.homePage.favicon}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}${pageData.slug}`}
      />
      <main>
        <NavMenu />
        <Sections sections={pageData.sections} />
        <Footer />
      </main>
      <footer />
    </div>
  );
};

export default NotFound;
