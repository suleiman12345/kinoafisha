import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Wrapper from "./components/Wrapper/index.jsx";
import Navbar from "./components/Navbar/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Wrapper>
      <App />
    </Wrapper>
  </BrowserRouter>
);
