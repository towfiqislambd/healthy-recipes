import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen max-h-screen flex items-center justify-center">
      <div className="container">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="bg-[#FCFCFC] max-w-[600px] mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
