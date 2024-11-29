import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";

import Home from "@/pages/Home";
import Details from "@/pages/Details";
import Category from "@/pages/Category";
import Collection from "@/pages/Collection";
import Discover from "@/pages/Discover";
import Auth from "@/pages/Auth";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "details/:id", element: <Details /> },
            { path: "/:categoryType/:categoryName/:categoryId", element: <Category /> },
            { path: "/collection/:collectionName", element: <Collection /> },
            { path: "/discover", element: <Discover /> },
            { path: "/login", element: <Auth /> },
        ],
    },
]);
