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
import { Sections } from "components/Sections/Sections";
import { selectPage, setPage } from "services/redux/pageSlice";

const ServicePage: NextPage = () => {
  const [treatment] = useAppSelector(selectTreatments());
  const siteInfo = useAppSelector(selectInfo());
  const pageData = useAppSelector(selectPage());
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
        <Header type="normal" data={{ heading: treatment.name }} />
        <Sections sections={pageData.sections} />
      </main>
      <footer />
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
