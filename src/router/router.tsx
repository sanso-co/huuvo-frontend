import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";

import Home from "@/pages/Home";
import Details from "@/pages/Details/Details";
import { Keyword } from "@/pages/Category/Keyword";
import { Genre } from "@/pages/Category/Genre";
import { Crew } from "@/pages/Category/Crew";
import { Cast } from "@/pages/Category/Cast";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "details/:id", element: <Details /> },
      { path: "keywords/:id", element: <Keyword /> },
      { path: "genres/:id", element: <Genre /> },
      { path: "cast/:id", element: <Cast /> },
      { path: "credit/:id", element: <Crew /> },
    ],
  },
]);
