import { useState } from "react";
import { isString, isNumber, array as simpulArray } from "simpul";

export function useSorter({ array, initialState }) {
  // Initialize sort state/setter
  const [sort, setSort] = useState(initialState);

  // Sort array by sort.key. If both values being compared are strings,
  // then use localeCompare, otherwise do normal sort.
  array.sort((a, b) => {
    a = a[sort.key];
    b = b[sort.key];
    return !a
      ? 1
      : !b
      ? -1
      : isString(a) && isString(b)
      ? a.localeCompare(b)
      : a - b;
  });

  // Reverse the order if sort.reverse is true.
  sort.reverse && array.reverse();

  // Shift array with undefined values for sort.key to end of the array.
  for (let i = array.length - 1; i >= 0; i--) {
    let value = array[i][sort.key];
    !value &&
      !isNumber(value) &&
      simpulArray.changeIndex(array, i, array.length - 1);
  }

  return { sort, setSort };
}
