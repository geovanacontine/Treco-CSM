import React, { useState, useEffect } from "react";
import ViewDetailPage from "./ViewDetailPage";
import ComponentDetailPage from "./ComponentDetailPage";

const AppContainer = () => {
  const [view, setView] = useState({});
  const [isLoading, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(true);

    function fetchView() {
      fetch("./viewExample.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setView(jsonData);
          setLoadingState(false);
        });
    }

    fetchView();
  }, [setView]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <ViewDetailPage view={view} />;
};

export default AppContainer;
