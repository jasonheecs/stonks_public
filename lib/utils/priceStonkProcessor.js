export const priceStonkProcessor = ({ stonks, responses }) =>
  new Promise((resolve, reject) => {
    // Pull CurrentQuote.Last as currentPrice for each stonk

    const parsedResponses = responses.map((response, index) => {
      const { Last: currentPrice } =
        (response &&
          response.Series &&
          response.Series[0] &&
          response.Series[0].CurrentQuote) ||
        {};

      return { stonk: stonks[index], currentPrice };
    });

    resolve(parsedResponses);
  });
