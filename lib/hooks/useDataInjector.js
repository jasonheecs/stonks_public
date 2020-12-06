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

  // Fetch price for each stonk when initialStonks updates.
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
      reducer.concat(
        stonk.posts.map((post) => ({
          timestamp: post.timestamp,
          stonk: stonk.stonk,
        }))
      ),
    []
  );

  const postPriceFetcherOnSuccess = (stonksWithPricedTimestamps) =>
    setStonks((currStonks) =>
      currStonks.map((currStonk) => ({
        ...currStonk,
        posts: currStonk.posts.map((currStonkPost) => ({
          ...currStonkPost,
          ...stonksWithPricedTimestamps.find(
            (stonkWithPricedTimestamp) =>
              stonkWithPricedTimestamp.stonk === currStonk.stonk &&
              stonkWithPricedTimestamp.timestamp === currStonkPost.timestamp
          ),
        })),
      }))
    );

  // Fetch price for each stonk's posts at timestamp when initialStonks updates.
  // Disable fetch's Abort Controller.
  // Updates stonks on success.
  useAsyncFetch({
    useEffectDependency: [initialStonks],
    url: "/api/price-post",
    query: { q: JSON.stringify(postPriceQuery) },
    disableController: true,
    onSuccess: postPriceFetcherOnSuccess,
  });

  // Check if prices exist for any stonks
  const pricesExist = stonks.some((stonk) => stonk.price);

  // If prices exist, remove stonks without a price.
  // Reduce post weighted totals that are required for the table.
  const stonksMapper = () =>
    stonks
      .filter((stonk) => (pricesExist ? stonk.price : true))
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
                totalCost: (reducer.totalCost +=
                  post.price && post.price.Value
                    ? post.price.Value * postScore
                    : 0),
              };
            },
            {
              totalPoints: 0,
              totalSentiment: 0,
              totalCost: 0,
            }
          )
        )
      )
      .map((stonk) => ({
        ...stonk,
        weightedSentiment: (stonk.totalSentiment / stonk.totalPoints).toFixed(
          2
        ),
        weightedCost: stonk.totalCost / stonk.totalPoints.toFixed(2),
        gainLoss:
          ((stonk.price - stonk.totalCost / stonk.totalPoints) /
            (stonk.totalCost / stonk.totalPoints)) *
          100,
      }));

  return { stonks: stonksMapper(), stonkPriceFetcher };
}
