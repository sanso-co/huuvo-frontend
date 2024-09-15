import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";

import Home from "@/pages/Home";
import Details from "@/pages/Details";
import Category from "@/pages/Category";
import Collection from "@/pages/Collection";
import Credit from "@/pages/Credit";
import ProviderCollection from "@/pages/Provider";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "details/:id", element: <Details /> },
            { path: "/:categoryType/:categoryName/:categoryId", element: <Category /> },
            { path: "/collection/:collectionName", element: <Collection /> },
            { path: "/provider/:providerName", element: <ProviderCollection /> },
            {
                path: "credit",
                children: [{ path: ":creditType/:creditId", element: <Credit /> }],
            },
        ],
    },
]);
