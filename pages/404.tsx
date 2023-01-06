import React, { useEffect } from "react";
import type { NextPage } from "next";
import { NavMenu } from "components/Navigation/NavMenu";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { Footer } from "components/Footer/Footer";
import {
  fetchAllServices,
  fetchMainNav,
  fetchPageFromSlug,
  fetchSiteInfo,
} from "services/graphQl.service";
import { selectPage, setPage } from "services/redux/pageSlice";
import { setNavigation } from "services/redux/navigationSlice";
import { Info, Navigation, Treatment } from "types/cms";
import { Sections } from "components/Sections/Sections";
import { setInfo } from "services/redux/siteInfoSlice";
import { setTreatments } from "services/redux/treatmentsSlice";

const NotFound: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        const dataPage = await fetchPageFromSlug("not-found", true);
        const nav = await fetchMainNav(true);
        const siteInfo = await fetchSiteInfo(true);
        const services = await fetchAllServices(true);
        dispatch(setPage(dataPage));
        dispatch(setNavigation(nav as Navigation));
        dispatch(setInfo(siteInfo as Info));
        dispatch(setTreatments(services as Treatment[]));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [dispatch]);
  const page = useAppSelector(selectPage());

  return (
    <div>
      <main>
        <NavMenu />
        <Sections sections={page.sections} />
        <Footer />
      </main>
      <footer />
    </div>
  );
};

export default NotFound;
