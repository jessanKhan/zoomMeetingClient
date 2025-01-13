import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNew from "./App-New";
// import MyComponent from "./MyComponent"; // Optional, if you have other routes
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppNew />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
