import { api, stonkScraper, stonkProcessor } from "../../lib";

// If request method is not a GET, return 405.
// Run stonkScraper + stonkProcessor and return results.
// If any errors, return 500 + error, and console.error for debugging.

export default (req, res) =>
  req.method === "GET"
    ? stonkScraper(req.query)
        .then(stonkProcessor)
        .then((result) => res.status(200).send(result))
        .catch((error) => {
          console.error(error);
          res.status(500).send(error);
        })
    : res.status(405).send(api.error["405"]);
