import { useMemo } from "react";
import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
const useQueryParams = (): URLSearchParams => {
  const location = useLocation();

  return useMemo(() => new URLSearchParams(location.search), [location.search]);
}

export default useQueryParams;