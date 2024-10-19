import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import { ChakraProvider } from "@chakra-ui/react";
Modal.setAppElement("#root");

ReactDOM.render(
    <ChakraProvider>
      <App />
    </ChakraProvider>,
  document.getElementById("root")
);
