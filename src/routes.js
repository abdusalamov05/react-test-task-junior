import { createBrowserRouter } from "react-router";
import { ProductList, ProductPage } from "./components";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProductList,
  },
  {
    path: "/product/:id",
    element: ProductPage,
  },
]);
