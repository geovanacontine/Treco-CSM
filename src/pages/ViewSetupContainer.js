import React, { useState, useEffect } from "react";
import ViewDetailPage from "./ViewDetailPage";
import ComponentDetailPage from "./ComponentDetailPage";

const ViewSetupContainer = () => {
  const [view, setView] = useState({});
  const [isLoading, setLoadingState] = useState(false);
  const [componentToEdit, setComponentToEdit] = useState({});
  const [isEditingComponent, setEditingComponentState] = useState(false);

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

  const didFinishEditingView = (view) => {
    console.log(view);
  };

  const didUpdateView = (view) => {
    setView(view);
  };

  const willEditComponent = (component) => {
    setEditingComponentState(true);
    setComponentToEdit(component);
  };

  const didFinishEditingComponent = (component) => {
    let temp = { ...view };
    let index = temp.body.findIndex((comp) => comp.id === component.id);
    temp.body[index] = component;
    setView(temp);
    setEditingComponentState(false);
    setComponentToEdit({});
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isEditingComponent) {
    return (
      <ComponentDetailPage
        component={componentToEdit}
        didFinishEditingComponent={didFinishEditingComponent}
      />
    );
  }

  return (
    <ViewDetailPage
      view={view}
      didFinishEditingView={didFinishEditingView}
      didUpdateView={didUpdateView}
      willEditComponent={willEditComponent}
    />
  );
};

export default ViewSetupContainer;
