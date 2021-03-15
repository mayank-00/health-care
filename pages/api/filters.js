// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import filters from "data/filters";

export default (req, res) => {

  if (req.method != "GET") {
    return res.status(501).end();
  }

  res.statusCode = 200;
  res.json(filters);
};
