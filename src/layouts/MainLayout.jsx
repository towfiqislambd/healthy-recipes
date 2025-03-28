import Footer from '@/shared/Footer';
import Navbar from '@/shared/Navbar';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
