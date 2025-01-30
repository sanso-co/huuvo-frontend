import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router/router";
import { initializeGA } from "./analytics";

import "./index.scss";

const queryClient = new QueryClient();

initializeGA();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <RouterProvider router={router} />
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </HelmetProvider>
    </React.StrictMode>
);
