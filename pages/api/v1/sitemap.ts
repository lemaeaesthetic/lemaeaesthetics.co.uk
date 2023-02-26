// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { fetchAllPages, fetchAllServices } from "services/graphQl.service";
import { Page, Treatment } from "types/cms";

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

const Sitemap: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const treatments = await fetchAllServices();
    const pages = await fetchAllPages();
    const siteMap = generateSiteMap(treatments, pages);
    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(siteMap);
    res.end();
  } catch (e: ReturnType<Error>) {
    res.status(500).json({
      success: false,
      data: {
        message: "INTERNAL_ERROR",
        details: e.message,
      },
    });
  }
};

export default Sitemap;
