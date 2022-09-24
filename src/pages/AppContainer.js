import React from "react";
import { Route, Routes } from "react-router-dom";
import ViewListPage from "./ViewListPage";
import ViewSetupContainer from "./ViewSetupContainer";

const AppContainer = () => {
  return <AppRouter class="container" />;

  function AppRouter() {
    return (
      <Routes>
        <Route path="/" element={<ViewListPage />} />
        <Route path="/view" element={<ViewSetupContainer />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    );
  }
};

export default AppContainer;
