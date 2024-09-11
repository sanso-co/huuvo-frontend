import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";

import Home from "@/pages/Home/Home";
import Details from "@/pages/Details/Details";
import { Category } from "@/pages/List/Category";
import Collection from "@/pages/Collection";
import { Credit } from "@/pages/List/Credit";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "details/:id", element: <Details /> },
            { path: "/:categoryType/:categoryName/:categoryId", element: <Category /> },
            { path: "/collection/:collectionName", element: <Collection /> },
            {
                path: "credit",
                children: [{ path: ":creditType/:creditId", element: <Credit /> }],
            },
        ],
    },
]);
