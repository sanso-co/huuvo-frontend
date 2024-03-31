import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";

import Home from "@/pages/Home";
import Details from "@/pages/Details/Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "details/:id", element: <Details /> },
    ],
  },
]);
