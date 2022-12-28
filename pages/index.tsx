import React from "react";
import type { NextPage } from "next";
import pages from "config/data/page.data";
import { Meta } from "components/Meta/Meta";
import { Header } from "components/Header/Header";
import { NavMenu } from "components/Navigation/NavMenu";
import {
  fetchAllServices,
  fetchMainNav,
  fetchPageFromSlug,
  fetchSiteInfo,
} from "services/graphQl.service";
import { FeaturedTreatmentsSection } from "components/Sections/FeaturedTreatments/FeaturedTreatments";
import { AboutUsSection } from "components/Sections/AboutUs/AboutUs";
import { EnquireSection } from "components/Sections/Enquire/EnquireSection";
import { wrapper } from "services/redux/store";
import { setTreatments } from "services/redux/treatmentsSlice";
import { FollowUs } from "components/Sections/FollowUs/FollowUs";
import { setNavigation } from "services/redux/navigationSlice";
import { isNavigation } from "types/cms";
import { selectPage, setPage } from "services/redux/pageSlice";
import { useAppSelector } from "services/redux/hooks";
import { Footer } from "components/Footer/Footer";
import { setInfo } from "services/redux/siteInfoSlice";

const Home: NextPage = () => {
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
        <Header type="hero" />
        {pageData?.sections.map((section) => {
          if (section.id === "Enquire") {
            return (
              <EnquireSection
                key={Math.random().toString(36).substring(2, 9)}
                data={section}
              />
            );
          }
          if (section.id === "Treatments") {
            return (
              <FeaturedTreatmentsSection
                key={Math.random().toString(36).substring(2, 9)}
                data={section}
              />
            );
          }
          if (section.id === "Follow Us") {
            return (
              <FollowUs key={Math.random().toString(36).substring(2, 9)} />
            );
          }
          if (section.id === "About") {
            return (
              <AboutUsSection
                data={section}
                key={Math.random().toString(36).substring(2, 9)}
              />
            );
          }
          return null;
        })}
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
