import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      {location.pathname !== "/dashboard" && <Footer />}
    </>
  );
};

export default MainLayout;
