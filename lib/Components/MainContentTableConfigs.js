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
    key: "weightedCost",
    header: "average cost",
    cell: ({ weightedCost }) =>
      isNumber(weightedCost) && simpulNumber.finance(weightedCost),
  },
  {
    key: "price",
    header: "current price",
    cell: ({ price }) => isNumber(price) && simpulNumber.finance(price),
  },
  {
    key: "gainLoss",
    header: "total return",
    symbolize: true,
    cell: ({ gainLoss }) =>
      isNumber(gainLoss) && Math.abs(gainLoss).toFixed(2) + "%",
  },
];

export default MainContentTableConfigs;
