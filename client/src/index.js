import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SideBarContextProvider } from "./context/Sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <SideBarContextProvider>
    <App />
  </SideBarContextProvider>
  // </React.StrictMode>
);
