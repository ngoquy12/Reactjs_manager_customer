import { useEffect, useState } from "react";

const useDebouce = (value, delay) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchValue(value);
    }, delay);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return searchValue;
};

export default useDebouce;
