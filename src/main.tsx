import "@fontsource-variable/baloo-2/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./routes/App";
import Menu from "./routes/Menu";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/menu", element: <Menu /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
