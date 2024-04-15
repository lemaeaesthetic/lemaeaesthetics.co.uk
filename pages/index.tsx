import React from "react";
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
import { Info, Page, isNavigation } from "types/cms";
import { setPage } from "services/redux/pageSlice";
import { Footer } from "components/Footer/Footer";
import { setInfo } from "services/redux/siteInfoSlice";
import { Sections } from "components/Sections/Sections";
import { Schema } from "components/Base/Schema";

const Home = ({ siteInfo, pageData }: { pageData: Page; siteInfo: Info }) => {
  console.log(siteInfo.address);
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
        <Footer info={siteInfo} />
      </main>
      <footer />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const pageData = await fetchPageFromSlug("/");
      const nav = await fetchMainNav();
      const services = await fetchAllServices();
      const siteInfo = await fetchSiteInfo();

      if (!pageData || !services || !isNavigation(nav) || !siteInfo) {
        return { notFound: true };
      }
      store.dispatch(setTreatments(services));
      store.dispatch(setNavigation(nav));
      store.dispatch(setPage(pageData));
      store.dispatch(setInfo(siteInfo as any));
      return {
        props: {
          siteInfo,
          pageData,
          nav,
          services,
        },
      };
    } catch (e) {
      return { notFound: true };
    }
  }
);

export default Home;
