import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import pages from "config/data/page.data";
import { Meta } from "components/Meta/Meta";
import { Header } from "components/Header/Header";
import { NavMenu } from "components/Navigation/NavMenu";
import { fetchMainNav, fetchPageFromSlug } from "services/graphQl.service";

const GenericPage: NextPage = (props: any) => {
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
        <Header type="hero" />
      </main>
      <footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const links = await fetchMainNav();
    const page = await fetchPageFromSlug(context?.params?.pageSlug as string);
    if (links && page) {
      return {
        props: {
          nav: links,
          page,
        },
      };
    }
    return { notFound: true };
  } catch (e) {
    return { notFound: true };
  }
};

export default GenericPage;
