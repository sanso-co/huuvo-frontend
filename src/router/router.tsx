import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";

import Home from "@/pages/Home";
import Details from "@/pages/Details/Details";
import { Keyword } from "@/pages/Category/Keyword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "details/:id", element: <Details /> },
      { path: "keywords/:id", element: <Keyword /> },
    ],
  },
]);
