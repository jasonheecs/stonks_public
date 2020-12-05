import { useState, useEffect } from "react";

export function usePriceInjector({ initialStonks }) {
  // Initialize stonks state/setter.
  const [stonks, setStonks] = useState([]);

  // Update stonks everytime initialStonks changes. initialStonks is
  // the main list of stonks that gets fetched in /pages/index.js.
  useEffect(() => {
    setStonks(initialStonks);
  }, [initialStonks]);

  // Fetch current price for each stonk...
  const fetchStonkPrice = {};

  // Fetch price for each post...
  const fetchPostPrice = {};

  return { stonks, fetchStonkPrice, fetchPostPrice };
}
