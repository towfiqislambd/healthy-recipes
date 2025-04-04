import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen max-h-screen flex items-center justify-center px-5 sm:px-0">
      <div className="bg-[#FCFCFC] sm:p-8 sm:min-w-[600px] w-[400px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
