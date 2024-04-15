import React from "react";

import pages from "config/data/page.data";
import { Meta } from "components/Meta/Meta";
import { NavMenu } from "components/Navigation/NavMenu";
import {
  fetchMainNav,
  fetchPageFromSlug,
  fetchServiceFromSlug,
  fetchSiteInfo,
} from "services/graphQl.service";
import { setTreatments } from "services/redux/treatmentsSlice";
import { wrapper } from "services/redux/store";
import { Info, Treatment, isNavigation } from "types/cms";
import { setNavigation } from "services/redux/navigationSlice";
import { setInfo } from "services/redux/siteInfoSlice";
import { Header } from "components/Header/Header";
import { setPage } from "services/redux/pageSlice";
import { Content } from "components/Sections/Content/Content";
import { Footer } from "components/Footer/Footer";
import { EnquireSection } from "components/Sections/Enquire/EnquireSection";
import { GallerySection } from "components/Sections/Gallery/GallerySection";

const ServicePage = ({
  siteInfo,
  treatment,
}: {
  siteInfo: Info;
  treatment: Treatment;
}) => {
  return (
    <div>
      <Meta
        title={`${treatment.name} | ${siteInfo.name}`}
        description={treatment.description}
        favicon={pages.homePage.favicon}
        url={pages.homePage.slug}
        image={treatment.image.url}
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
        <GallerySection
          data={{
            id: "Gallery Section",
            heading: `${treatment.name}'s Gallery`,
            description: `View our happy client who have had ${treatment.name} with us. `,
            gallery: treatment.gallery,
            displayType: "GRID",
          }}
        />
        <EnquireSection
          data={{
            id: "Enquire",
            heading: `Book ${treatment.name}`,
            description: `Use the form below to book a call to discuss ${treatment.name}.`,
          }}
        />
      </main>
      <Footer info={siteInfo} />
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
      if (!page || !service || !isNavigation(nav) || !siteInfo) {
        return { notFound: true };
      }
      store.dispatch(setTreatments([service]));
      store.dispatch(setNavigation(nav));
      store.dispatch(setInfo(siteInfo as any));
      store.dispatch(setPage(page));
      return {
        props: {
          nav,
          siteInfo,
          treatment: service,
          pageData: page,
        },
      };
    } catch (e) {
      return { notFound: true };
    }
  }
);

export default ServicePage;
