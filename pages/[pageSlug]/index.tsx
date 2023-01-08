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
import { useAppSelector } from "services/redux/hooks";
import { selectPage, setPage } from "services/redux/pageSlice";
import { Sections } from "components/Sections/Sections";
import { isNavigation } from "types/cms";
import { setTreatments } from "services/redux/treatmentsSlice";
import { setNavigation } from "services/redux/navigationSlice";
import { setInfo } from "services/redux/siteInfoSlice";
import { wrapper } from "services/redux/store";
import { Footer } from "components/Footer/Footer";

const GenericPage: NextPage = () => {
  const pageData = useAppSelector(selectPage());
  console.log(pageData);
  return (
    <div>
      <Meta
        title={pages.homePage.title}
        description={pages.homePage.description}
        favicon={pages.homePage.favicon}
        url={pages.homePage.slug}
      />
      <main>
        <NavMenu />
        <Sections sections={pageData.sections} />
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const page = await fetchPageFromSlug(context?.params?.pageSlug as string);
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

export default GenericPage;
