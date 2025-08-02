import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { LoveSvg } from "@/components/svg-container/SvgContainer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import { useFooterInfo } from "@/hooks/cms.queries";
import { Loader } from "@/components/loader/Loader";
import { useLogOut } from "@/hooks/auth.hook.";

const DashboardLayout = () => {
  const { mutate: logOutMutate } = useLogOut();
  // Mutation
  const handleLogout = () => {
    logOutMutate();
  };
  const { user } = useAuth();
  const location = useLocation()?.pathname;
  const [isOpen, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const navLinks = [
    { path: "/", title: "Home" },
    { path: "/recipe-library", title: "Recipe library" },
    { path: "/dashboard/share-recipes", title: "Share recipe" },
    { path: "/meal-planner", title: "Meal planner" },
    { path: "/blog", title: "Blog" },
  ];

  const sidebarLinks = [
    { path: "/dashboard/overview", label: "Overview" },
    { path: "/dashboard/meal-planner", label: "Meal planner" },
    { path: "/dashboard/share-recipes", label: "Share recipes" },
    { path: "/dashboard/my-recipes", label: "My recipes" },
    { path: "/dashboard/saved-recipes", label: "Favorite recipes" },
    { path: "/dashboard/settings", label: "Settings" },
  ];

  const { data: siteSettings, isLoading } = useFooterInfo();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="min-h-screen max-h-screen flex flex-col">
      {/* Header */}
      <header className="py-1 px-5 3xl:px-20 border-b bg-[#F6F5F2] fixed xl:h-[90px] w-full left-0 top-0 z-50 navbar">
        <nav className="w-full flex justify-between items-center">
          {/* Left */}
          <div className="flex items-center xl:gap-5 2xl:gap-14">
            <Link to="/">
              <figure className="w-[80px] h-[70px] lg:w-[100px] lg:h-[87px]">
                <img
                  className="w-full h-full object-cover"
                  src={`${import.meta.env.VITE_SITE_URL}/${siteSettings?.logo}`}
                  alt="logo"
                />
              </figure>
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5 xl:gap-10 2xl:gap-20">
            <div className="hidden xl:flex xl:gap-5">
              {navLinks.map(item => (
                <NavLink
                  to={item.path}
                  key={item.title}
                  className={({ isActive }) =>
                    `${
                      isActive ||
                      (location.startsWith("/recipe-details") &&
                        item.path === "/recipe-library")
                        ? "text-primary"
                        : "text-textColor"
                    } hover:text-primary duration-300 transition-all`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
            <div className="flex gap-3 2xl:gap-5 items-center">
              <Link
                to="/dashboard/dashboard-saved-recipes"
                className="size-10 rounded-full bg-[#FDE0B8] hidden xl:inline-flex items-center justify-center"
              >
                <LoveSvg />
              </Link>

              {/* Avatar */}
              <button onClick={() => setOpenPopup(!openPopup)}>
                <Avatar className="size-10 lg:size-11 rounded-full cursor-pointer">
                  <AvatarFallback className="text-lg lg:text-[22px] font-medium w-full h-full rounded-full">
                    {user?.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* Mobile btns */}
              <button
                onClick={() => setOpen(!isOpen)}
                className="bg-primary xl:hidden text-white h-9 md:h-10 w-10 md:w-11 rounded grid place-items-center"
              >
                <FaBars className="text-2xl" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Layout Body */}
      <div
        onClick={() => setOpenPopup(false)}
        className="flex mt-[75px] lg:mt-[90px] h-[calc(100vh-90px)] bg-white relative"
      >
        {/* Profile Popup */}
        {openPopup && (
          <div
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="bg-white z-50 rounded-xl w-64 lg:w-72 absolute right-3 md:right-5 top-4 md:top-5 shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-4 md:p-5"
          >
            <div className="flex gap-3 md:gap-4 items-center mb-4 lg:mb-5">
              <Avatar className="size-12 rounded-full cursor-pointer">
                <AvatarFallback className="text-lg lg:text-[22px] font-medium w-full h-full rounded-full">
                  {user?.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold truncate">{user?.name}</h3>
                <p className="text-gray-500 text-sm truncate">{user?.email}</p>
              </div>
            </div>

            <hr />

            <div className="mt-4 lg:mt-5 font-medium flex text-sm lg:text-base gap-3 lg:gap-4 flex-col text-gray-700">
              <Link
                onClick={() => setOpenPopup(false)}
                to="/dashboard/settings"
              >
                My Profile
              </Link>
              <button onClick={handleLogout} className="text-left text-red-500">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <aside className="hidden xl:block xl:w-[210px] 2xl:w-[237px] bg-[#F6F7FB] overflow-y-auto pt-7 h-full">
          <ul className="text-[#5A5C5F] font-medium space-y-2 2xl:space-y-3">
            {sidebarLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `px-6 2xl:px-7 py-[11px] 2xl:py-3 block w-full duration-300 transition-all ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-primary hover:text-white text-[#5A5C5F]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        {/* Page Content */}
        <main
          className={`flex-1 overflow-y-auto ${
            location !== "/dashboard/overview" ? "p-4 sm:p-5" : "lg:p-5"
          }`}
        >
          <Outlet />
        </main>
      </div>

      {/* Blur Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 2xl:hidden z-[999] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } duration-500 transition-transform fixed top-0 z-[999] left-0 bg-white py-10 shadow-lg overflow-y-auto border-r max-h-screen min-h-screen w-[250px] xl:hidden`}
      >
        {/* logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <figure className="w-[100px] mx-auto h-[80px]">
            <img
              className="object-cover w-full h-full mx-auto"
              src={`${import.meta.env.VITE_SITE_URL}/${siteSettings?.logo}`}
              alt="logo"
            />
          </figure>
        </Link>

        {/* Nav Links */}
        <ul className="text-[#5A5C5F] font-medium space-y-1 2xl:space-y-3 mt-8">
          {sidebarLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-6 2xl:px-7 py-[11px] 2xl:py-3 block w-full duration-300 transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-primary hover:text-white text-[#5A5C5F]"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Close btn */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3"
        >
          <RxCross2 className="text-xl" />
        </button>
      </div>
    </section>
  );
};

export default DashboardLayout;
