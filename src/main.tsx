import "@fontsource-variable/baloo-2/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./routes/App";
import Menu from "./routes/Menu";
import Item from "./routes/Item";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/menu", element: <Menu /> },
  { path: "/items", element: <Item /> }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
