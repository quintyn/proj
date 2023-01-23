import { useState } from "react";

function useFilter() {
  const [searchCriteria, setSearchCriteria] = useState({});
  const [filterCriteria, setFilterCriteria] = useState({});

  const search = (criteria) => {
    setSearchCriteria(criteria);
  };

  const filter = (criteria) => {
    setFilterCriteria(criteria);
  };

  return { search, filter, searchCriteria, filterCriteria };
}

export { useFilter };
