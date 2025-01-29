import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";

import Home from "@/pages/Home";
import Details from "@/pages/Details";
import Category from "@/pages/Category";
import Collection from "@/pages/Collection";
import Discover from "@/pages/Discover";
import Auth from "@/pages/Auth";
import Settings from "@/pages/User/Settings";
import ProtectedRoute from "./protectedRoute";
import Complete from "@/pages/Auth/Complete";
import TempProtectedRoute from "./tempProtectedRoute";
import Profile from "@/pages/User/Profile";
import Status from "@/pages/User/Status";
import { navigationService } from "@/services/navigation";

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
            { path: "/signup", element: <Auth /> },
            { path: "/profile/:id", element: <Profile /> },
            { path: "/profile/shows/:category", element: <Status /> },
        ],
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [{ path: "/settings", element: <Settings /> }],
    },
    {
        path: "/",
        element: (
            <TempProtectedRoute>
                <Layout />
            </TempProtectedRoute>
        ),
        children: [{ path: "/complete-profile", element: <Complete /> }],
    },
]);

navigationService.setRouter(router);
