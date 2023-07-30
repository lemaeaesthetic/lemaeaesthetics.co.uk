import React from "react";
import type { NextPage } from "next";
import pages from "config/data/page.data";
import { Meta } from "components/Meta/Meta";
import { NavMenu } from "components/Navigation/NavMenu";
import {
  fetchAllServices,
  fetchMainNav,
  fetchPageFromSlug,
  fetchSiteInfo,
} from "services/graphQl.service";
import { wrapper } from "services/redux/store";
import { setTreatments } from "services/redux/treatmentsSlice";
import { setNavigation } from "services/redux/navigationSlice";
import { isNavigation } from "types/cms";
import { selectPage, setPage } from "services/redux/pageSlice";
import { useAppSelector } from "services/redux/hooks";
import { Footer } from "components/Footer/Footer";
import { setInfo } from "services/redux/siteInfoSlice";
import { Sections } from "components/Sections/Sections";
import { Schema } from "components/Base/Schema";

const Home: NextPage = () => {
  const pageData = useAppSelector(selectPage());
  console.log(pageData);
  return (
    <div>
      <Schema />
      <Meta
        title={pageData?.seoTitle || pageData.title}
        description={pageData.seoDescription || ""}
        favicon={pages.homePage.favicon}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}${pageData.slug}`}
        image={pageData.socialShareImage?.url || pageData.image.url}
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const page = await fetchPageFromSlug("/");
      const nav = await fetchMainNav();
      const services = await fetchAllServices();
      const siteInfo = await fetchSiteInfo();
      if (!page || !services || !isNavigation(nav) || !siteInfo)
        return { notFound: true };
      store.dispatch(setTreatments(services));
      store.dispatch(setNavigation(nav));
      store.dispatch(setPage(page));
      store.dispatch(setInfo(siteInfo as any));
      return {
        props: {},
      };
    } catch (e) {
      return { notFound: true };
    }
  }
);

export default Home;
