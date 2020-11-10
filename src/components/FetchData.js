import React from "react";

import Loading_Component from "./Loading_Component"
import useFetchData from "./useFetchData"

function FetchData({ action, children }) {
  const [data, isLoaded, error] = useFetchData(action);

  // if (error) {
  //   return <ErrorComponent error={error} />;
  // }

  if (!isLoaded) {
    alert("isLoad")
    return <Loading_Component />
  }

  if (data) {
    alert("data")
    return null
  }

}

export default FetchData;
