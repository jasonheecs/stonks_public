import { filters } from "../constants";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function useParams({ query }) {
  // Reduce default query params from configs.
  const defaultParams = filters.reduce(
    (reducer, filter) =>
      Object.assign(reducer, {
        [filter.key]: filter.options.find(
          (filterOption) => filterOption.isDefault
        ).value,
      }),
    {}
  );

  // Initialize params state/setter, using query params - fill in
  // with defaults if there is any missing values.
  const [params, setParams] = useState({ ...defaultParams, ...query });

  // Only require key/value pair to update params.
  const updateParams = (update) => setParams({ ...params, ...update });

  // Initialize router for use.
  const router = useRouter();

  useEffect(() => {
    // Update URL query after every params update.
    router.push({ pathname: "/", query: params });
  }, [params]);

  return { params, setParams: updateParams };
}
