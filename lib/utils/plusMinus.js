// Return absolute number with plus/minus sign.

export const plusMinus = (num) =>
  (
    (num > 0 ? "+" : num < 0 ? "-" : "") + Math.abs(num).toFixed(2)
  ).toLocaleString();
