// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { fetchFromGraphQl } from "services/graphQl.service";

const Fetch: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body = JSON.parse(req.body);
    if (!body.query) return;
    const data = await fetchFromGraphQl(body.query);
    res.status(200).json({ data });
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
