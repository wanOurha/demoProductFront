import { useState, useEffect } from "react";

function useFetchData(action) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const actionData = await action[0]
        setData(false)
        setIsLoaded(true)
        console.log("getNewdata")
      } catch (error) {
        setIsLoaded(true)
        setError(error)
        console.log("error")
      }
      return () => {
        setIsLoaded(false)
      }
    }
    loadData();
  }, [action]);

  return [data, isLoaded, error];
}

export default useFetchData;
