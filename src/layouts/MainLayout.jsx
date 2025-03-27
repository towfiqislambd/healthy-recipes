import Footer from '@/shared/Footer';
import Navbar from '@/shared/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
