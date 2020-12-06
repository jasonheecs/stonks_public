import { useState, useEffect } from "react";
import useAsyncFetch from "async-fetch";
import { getMinutes } from "../utils";
import { isNumber } from "simpul";
import TextCleaner from "text-cleaner";

export function useDataInjector({ initialStonks }) {
  // Initialize stonks state/setter.
  const [stonks, setStonks] = useState([]);

  // Update stonks everytime initialStonks updates. initialStonks is
  // the main list of stonks that gets fetched in /pages/index.js.
  useEffect(() => {
    setStonks(initialStonks);
  }, [initialStonks]);

  // Add price data for each stonk on stonkPriceFetcher success.
  const stonkPriceFetcherOnSuccess = (stonksWithPrices) =>
    setStonks((currStonks) =>
      currStonks.map((currStonk) => ({
        ...currStonk,
        ...stonksWithPrices.find((i) => i.stonk === currStonk.stonk),
      }))
    );

  // Fetch current price for each stonk when initialStonks updates.
  // Poll for new data every 5 minutes.
  // Disable fetch's Abort Controller.
  // Updates stonks on success.
  const stonkPriceFetcher = useAsyncFetch({
    useEffectDependency: [initialStonks],
    url: "/api/price-stonk",
    query: { stonks: initialStonks.map((initialStonk) => initialStonk.stonk) },
    poll: getMinutes(5),
    disableController: true,
    onSuccess: stonkPriceFetcherOnSuccess,
  });

  // Query price for stonk posts by timestamps.
  const postPriceQuery = initialStonks.reduce(
    (reducer, stonk) =>
      Object.assign(reducer, {
        [stonk.stonk]: stonk.posts.map((post) => post.timestamp),
      }),
    {}
  );

  const postPriceFetcherOnSuccess = console.log;

  // const postPriceFetcherOnSuccess = (stonksWithHistoricalData) =>
  // setStonks((currStonks) =>
  //   currStonks.map((currStonk) => ({
  //     ...currStonk,
  //     posts: currStonk.posts.map(currStonkPost => {...currStonkPost, cost: stonksWithPrices[currStonk.stonk]})
  //   }))
  // )

  // Fetch price for each stonk's posts at timestamp when initialStonks updates.
  // Disable fetch's Abort Controller.
  // Updates stonks on success.
  useAsyncFetch({
    useEffectDependency: [initialStonks],
    url: "/api/price-post",
    query: postPriceQuery,
    disableController: true,
    onSuccess: postPriceFetcherOnSuccess,
  });

  // Check if current prices exist for any stonks
  const currentPricesExist = stonks.some((stonk) => stonk.currentPrice);

  // If current prices exist, remove stonks without a current price.
  // Reduce post weighted totals that are required for the table.
  const stonksMapper = () =>
    stonks
      .filter((stonk) => (currentPricesExist ? stonk.currentPrice : true))
      .map((stonk) =>
        Object.assign(
          stonk,
          stonk.posts.reduce(
            (reducer, post) => {
              const parsedScore = parseFloat(post.score.replace(/,/g, ""));
              const postScore = isNumber(parsedScore) ? parsedScore : 0;
              return {
                totalPoints: (reducer.totalPoints += postScore),
                totalSentiment: (reducer.totalSentiment +=
                  post.sentiment * postScore),
              };
            },
            { totalPoints: 0, totalSentiment: 0 }
          )
        )
      )
      .map((stonk) => ({
        ...stonk,
        totalSentiment: (stonk.totalSentiment / stonk.totalPoints).toFixed(2),
      }));

  return { stonks: stonksMapper(), stonkPriceFetcher };
}
