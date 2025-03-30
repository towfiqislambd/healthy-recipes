import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen max-h-screen flex items-center justify-center">
      <div className="bg-[#FCFCFC] p-8 min-w-[600px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
