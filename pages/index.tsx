import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import pages from "config/data/page.data";
import { Meta } from "components/Meta/Meta";
import { Header } from "components/Header/Header";
import { NavMenu } from "components/Navigation/NavMenu";
import { fetchAllServices, fetchMainNav } from "services/graphQl.service";
import { FeaturedTreatmentsSection } from "components/Sections/FeaturedTreatments/FeaturedTreatments";
import { AboutUsSection } from "components/Sections/AboutUs/AboutUs";

const Home: NextPage = (props: any) => {
  const { services } = props;
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
        <Header type="hero" />
        <FeaturedTreatmentsSection treatments={services} />
        <AboutUsSection />
      </main>
      <footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const links = await fetchMainNav();
    const services = await fetchAllServices();
    if (links && services) {
      return {
        props: {
          nav: links,
          services,
        },
      };
    }
    return { notFound: true };
  } catch (e) {
    return { notFound: true };
  }
};

export default Home;
