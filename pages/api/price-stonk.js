import { api, priceStonkScraper, priceStonkProcessor } from "../../lib";

export default (req, res) => {
  const stonks = req.query.stonks && req.query.stonks.split(",");

  // If request method is not a GET, return 405.
  // If there aren't any stonks requested, return 400.
  // Run priceStonkScraper + priceStonkProcessor and return results.
  // If any errors, return 500 + error, and console.error for debugging.

  req.method === "GET"
    ? stonks && stonks.length
      ? priceStonkScraper(stonks)
          .then(priceStonkProcessor)
          .then((result) => res.status(200).send(result))
          .catch((error) => {
            console.error(error.toString());
            res.status(500).send(error);
          })
      : res.status(400).send("No stonks requested.")
    : res.status(405).send(api.error["405"]);
};
