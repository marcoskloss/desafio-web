import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";

import { GlobalStyle } from "./styles/GlobalStyle";
import { definitions } from "./styles/theme";
import Home from "./pages/Home";
import { UserProvivder } from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={definitions}>
      <Toaster />
      <GlobalStyle />

      <UserProvivder>
        <Home />
      </UserProvivder>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
