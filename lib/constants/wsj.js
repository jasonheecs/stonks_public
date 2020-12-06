export const wsj = ({ stonk, date }) => ({
  method: "GET",
  url: "https://api.wsj.net/api/michelangelo/timeseries/history",
  headers: {
    ["Dylan2010.EntitlementToken"]: "57494d5ed7ad44af85bc59a51dd87c90",
  },
  params: {
    ckey: "57494d5ed7",
    json: {
      Step: "PT60M",
      EntitlementToken: "57494d5ed7ad44af85bc59a51dd87c90",
      IncludeMockTick: true,
      FilterNullSlots: false,
      FilterClosedPoints: true,
      IncludeClosedSlots: false,
      IncludeOfficialClose: true,
      InjectOpen: false,
      ShowPreMarket: false,
      ShowAfterHours: false,
      UseExtendedTimeFrame: true,
      WantPriorClose: false,
      ResetTodaysAfterHoursPercentChange: false,
      Series: [
        {
          Key: "/US//" + stonk,
          Dialect: "Charting",
          Kind: "Ticker",
          SeriesId: "s1",
          DataTypes: ["Last"],
        },
      ],
      ...(date
        ? {
            TimeFrame: "custom",
            IncludeCurrentQuotes: false,
            StartDate: date,
            EndDate: date,
          }
        : {
            TimeFrame: "D1",
            IncludeCurrentQuotes: true,
          }),
    },
  },
});
