// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const Robots: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    res.send(
      `User-agent: *\nAllow: /\n\nSitemap: ${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
    );
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

export default Robots;
