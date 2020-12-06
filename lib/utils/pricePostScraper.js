import { dateStringTime } from "./dateStringTime";
import axios from "axios";
import { wsj } from "../constants";

export const pricePostScraper = (query) =>
  new Promise((resolve, reject) => {
    const stonks = Object.keys(query);

    const allPromises = stonks.reduce((reducer, stonk) => {
      let dates = query[stonk].split(",").map(dateStringTime);
      dates = [...new Set(dates)];
      return reducer.concat(
        dates.map((date) =>
          console.log(
            wsj({ stonk, date }).params.json
            // axios(wsj({ stonk, date }))
          )
        )
      );
    }, []);

    // Promise.allSettled(allPromises)
    //   .then((responses) =>
    //     resolve({
    //       stonks,
    //       query,
    //       responses: responses.map(
    //         (response) => response.value && response.value.data
    //       ),
    //     })
    //   )
    //   .catch(reject);
  });
