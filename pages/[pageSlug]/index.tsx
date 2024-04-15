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
import { setPage } from "services/redux/pageSlice";
import { Sections } from "components/Sections/Sections";
import { Info, Page, isNavigation } from "types/cms";
import { setTreatments } from "services/redux/treatmentsSlice";
import { setNavigation } from "services/redux/navigationSlice";
import { setInfo } from "services/redux/siteInfoSlice";
import { wrapper } from "services/redux/store";
import { Footer } from "components/Footer/Footer";
import { Schema } from "components/Base/Schema";

const GenericPage = ({
  siteInfo,
  pageData,
}: {
  siteInfo: Info;
  pageData: Page;
}) => {
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
      </main>
      <Footer info={siteInfo} />
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
        props: {
          nav,
          siteInfo,
          services,
          pageData: page,
        },
      };
    } catch (e) {
      return { notFound: true };
    }
  }
);

export default GenericPage;
