import React from "react";
import type { NextPage } from "next";
import pages from "config/data/page.data";
import { Meta } from "components/Meta/Meta";
import { NavMenu } from "components/Navigation/NavMenu";
import {
  fetchMainNav,
  fetchPageFromSlug,
  fetchServiceFromSlug,
  fetchSiteInfo,
} from "services/graphQl.service";
import {
  selectTreatments,
  setTreatments,
} from "services/redux/treatmentsSlice";
import { wrapper } from "services/redux/store";
import { isNavigation } from "types/cms";
import { setNavigation } from "services/redux/navigationSlice";
import { selectInfo, setInfo } from "services/redux/siteInfoSlice";
import { useAppSelector } from "services/redux/hooks";
import { Header } from "components/Header/Header";
import { setPage } from "services/redux/pageSlice";
import { Content } from "components/Sections/Content/Content";
import { Footer } from "components/Footer/Footer";
import { Gallery } from "components/Gallery/Gallery";

const ServicePage: NextPage = () => {
  const [treatment] = useAppSelector(selectTreatments());
  const siteInfo = useAppSelector(selectInfo());
  console.log(treatment);
  return (
    <div>
      <Meta
        title={`${treatment.name} | ${siteInfo.name}`}
        description={treatment.description}
        favicon={pages.homePage.favicon}
        url={pages.homePage.slug}
      />
      <main>
        <NavMenu />
        <Header
          type="pdp"
          data={{
            heading: treatment.name,
            image: treatment.image,
            price: treatment.price,
            time: treatment.timeEstimate,
          }}
        />
        <Content data={{ id: "Content Section", content: treatment.content }} />
        <Gallery gallery={treatment.gallery} />
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      if (context?.params?.pageSlug !== "treatments") return { notFound: true };
      const nav = await fetchMainNav();
      const service = await fetchServiceFromSlug(
        context?.params?.treatmentsSlug as string
      );
      const siteInfo = await fetchSiteInfo();
      const page = await fetchPageFromSlug("treatment");
      if (!page || !service || !isNavigation(nav) || !siteInfo)
        return { notFound: true };
      store.dispatch(setTreatments([service]));
      store.dispatch(setNavigation(nav));
      store.dispatch(setInfo(siteInfo as any));
      store.dispatch(setPage(page));
      return { props: {} };
    } catch (e) {
      return { notFound: true };
    }
  }
);

export default ServicePage;
