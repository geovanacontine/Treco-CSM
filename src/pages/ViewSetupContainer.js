import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import ViewDetailPage from "./ViewDetailPage";
import ComponentDetailPage from "./ComponentDetailPage";
import AddComponentView from "./components/AddComponentView";
import DeleteComponentView from "./components/DeleteItemView";

const ViewSetupContainer = () => {
  const [view, setView] = useState({});
  const [isLoading, setLoadingState] = useState(false);
  const [componentList, setComponentList] = useState({});
  const [componentToDelete, setComponentToDelete] = useState("");
  const [componentToEdit, setComponentToEdit] = useState({});
  const [isEditingComponent, setEditingComponentState] = useState(false);
  const {
    isOpen: isOpenAddComponent,
    onOpen: willAddComponent,
    onClose: onCloseAddComponent,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteComponent,
    onOpen: onOpenDeleteComponent,
    onClose: onCloseDeleteComponent,
  } = useDisclosure();

  const [searchParams] = useSearchParams();
  const viewId = searchParams.get("id");

  useEffect(() => {
    setLoadingState(true);

    function fetchView() {
      fetch(`./${viewId}.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setView(jsonData);
          setLoadingState(false);
        });
    }

    function fetchComponentList() {
      fetch("./componentList.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setComponentList(jsonData);
        });
    }

    fetchView();
    fetchComponentList();
  }, [viewId]);

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

  const willDeleteComponent = (componentId) => {
    setComponentToDelete(componentId);
    onOpenDeleteComponent();
  };

  const didFinishDeleteComponent = (componentId) => {
    let temp = { ...view };
    let index = temp.body.findIndex((comp) => comp.id === componentId);
    temp.body.splice(index, 1);
    setView(temp);
    onCloseDeleteComponent();
  };

  const didFinishAddingComponent = (component) => {
    let temp = { ...view };
    temp.body.push(component);
    setView(temp);
    onCloseAddComponent();
    willEditComponent(component);
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
    <>
      <AddComponentView
        isOpen={isOpenAddComponent}
        onClose={onCloseAddComponent}
        componentList={componentList?.components}
        onClick={(component) => {
          didFinishAddingComponent(component);
        }}
      />

      <DeleteComponentView
        title="Delete Component"
        isOpen={isOpenDeleteComponent}
        onClose={onCloseDeleteComponent}
        itemId={componentToDelete}
        onClick={(componentId) => {
          didFinishDeleteComponent(componentId)
        }}
      />

      <ViewDetailPage
        view={view}
        didFinishEditingView={didFinishEditingView}
        didUpdateView={didUpdateView}
        willEditComponent={willEditComponent}
        willAddComponent={willAddComponent}
        willDeleteComponent={willDeleteComponent}
      />
    </>
  );
};

export default ViewSetupContainer;
