// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
      <BrowserRouter>
        <AppRoutes />
        {/*<h1>test</h1>*/}
      </BrowserRouter>
    // </StrictMode>
);
