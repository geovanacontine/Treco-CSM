import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import AppContainer from "./pages/AppContainer";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppContainer/>
    </ChakraProvider>
  </React.StrictMode>
);
