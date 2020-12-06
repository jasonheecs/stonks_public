// Map historical data in responses to each stonk.

export const pricePostProcessor = ({ stonks, query, responses }) =>
  new Promise((resolve, reject) => {
    responses.forEach((response) => console.log(response));
    // resolve(
    //   stonks.reduce(
    //     (reducer, stonk, index) =>
    //       Object.assign(reducer, { [stonk]: responses[index] }),
    //     {}
    //   )
    // );
    resolve([]);
  });
