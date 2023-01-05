// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const Fetch: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body = JSON.parse(req.body);
    if (!body.query) return;
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CMS_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: body.query }),
      }
    );
    const response = await request.json();

    res.status(200).json({ data: { ...response } });
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

export default Fetch;
