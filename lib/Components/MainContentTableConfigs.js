import { number as simpulNumber, isNumber } from "simpul";

const MainContentTableConfigs = [
  {
    key: "stonk",
    header: "stonk",
  },
  {
    key: "totalPoints",
    header: "shares",
    cell: (stonk) => stonk.totalPoints.toLocaleString(),
  },
  {
    key: "averageCost",
    header: "average cost",
    cell: ({ averageCost }) =>
      isNumber(averageCost) && simpulNumber.finance(averageCost),
  },
  {
    key: "currentPrice",
    header: "current price",
    cell: ({ currentPrice }) =>
      isNumber(currentPrice) && simpulNumber.finance(currentPrice),
  },
  {
    key: "totalGainLoss",
    header: "total gain/loss",
    symbolize: true,
    cell: ({ totalGainLoss }) =>
      isNumber(totalGainLoss) && Math.abs(totalGainLoss.toFixed(2)) + "%",
  },
];

export default MainContentTableConfigs;
