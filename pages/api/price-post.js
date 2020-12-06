import { api, pricePostScraper, pricePostProcessor } from "../../lib";
import { isObjectValid } from "simpul";

// If request method is not a GET, return 405.
// If there aren't any stonks requested, return 400.
// Run pricePostScraper + pricePostProcessor and return results.
// If any errors, return 500 + error, and console.error for debugging.

export default (req, res) =>
  req.method === "GET"
    ? isObjectValid(req.query)
      ? pricePostScraper(req.query)
          .then(pricePostProcessor)
          .then((result) => res.status(200).send(result))
          .catch((error) => {
            console.error(error.toString());
            res.status(500).send(error);
          })
      : res.status(400).send("No stonks requested.")
    : res.status(405).send(api.error["405"]);
