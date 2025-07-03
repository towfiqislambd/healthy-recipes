import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./provider/AuthProvider";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

// For Favicon and title Dynamic
const fetchSiteSettings = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SITE_URL}/api/site-settings`
    );
    const formattedData = await res.json();

    if (formattedData?.data) {
      const { favicon, system_name } = formattedData.data;

      // Update favicon
      const link =
        document.querySelector("link[rel~='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = `${import.meta.env.VITE_SITE_URL}/${favicon}`;
      document.head.appendChild(link);

      // Update title
      document.title = system_name || "Your Health Recipe";
    }
  } catch (err) {
    console.error("Error fetching site settings:", err);
  }
};

fetchSiteSettings();
