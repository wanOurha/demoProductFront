import React, { useState, useEffect } from "react";

export default function useLoadComponent(action) {
  const [isLoad, setisLoad] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setisLoad(true)
      } catch {
        setisLoad(true)
        setError(true)
      }
    }
    loadData();
  }, [action]);

  return [isLoad,error]
}
