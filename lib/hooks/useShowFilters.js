import { useState } from "react";

export function useShowFilters() {
  // Initialize showFilters state/setter.
  const [showFilters, setShowFilters] = useState(false);

  // Use current showFilters state to update showFilters.
  const updateShowFilters = () =>
    setShowFilters((currShowFilters) => !currShowFilters);

  return { showFilters, setShowFilters: updateShowFilters };
}
