import { GetServerSidePropsContext, NextPage } from "next";
import { Page, Treatment } from "types/cms";
import { fetchAllPages, fetchAllServices } from "services/graphQl.service";

const SiteMap: NextPage = () => null;

const generateSiteMap = (treatments: Treatment[], pages: Page[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${`${process.env.NEXT_PUBLIC_BASE_URL}/`}</loc>
      </url>
      ${pages
        .filter(({ slug }) => slug !== "/")
        .map(({ slug }) => {
          return `
        <url>
            <loc>${`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`}</loc>
        </url>
      `;
        })
        .join("")}
      ${treatments
        .map(({ slug }) => {
          return `
        <url>
            <loc>${`${process.env.NEXT_PUBLIC_BASE_URL}/treatments/${slug}`}</loc>
        </url>
      `;
        })
        .join("")}
    </urlset>
  `;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const treatments = await fetchAllServices();
  const pages = await fetchAllPages();
  const siteMap = generateSiteMap(treatments, pages);
  context.res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  context.res.write(siteMap);
  context.res.end();
  return {
    props: {},
  };
};

export default SiteMap;
