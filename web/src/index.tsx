import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "./styles/GlobalStyle";
import { definitions } from "./styles/theme";
import Home from "./pages/Home";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={definitions}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
