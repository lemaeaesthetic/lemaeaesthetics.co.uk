import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import pages from "config/data/page.data";
import { Meta } from "components/Meta/Meta";

import { NavMenu } from "components/Navigation/NavMenu";
import { fetchMainNav, fetchServiceFromSlug } from "services/graphQl.service";

const ServicePage: NextPage = (props: any) => {
  console.log(props);
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
      </main>
      <footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    if (context?.params?.pageSlug !== "service") return { notFound: true };
    const links = await fetchMainNav();
    const service = await fetchServiceFromSlug(
      context?.params?.serviceSlug as string
    );
    if (links && service) {
      return {
        props: {
          nav: links,
          service,
        },
      };
    }
    return { notFound: true };
  } catch (e) {
    return { notFound: true };
  }
};

export default ServicePage;
