import useAuth from "@/hooks/useAuth";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useLogOut } from "@/hooks/auth.hook.";
import { useAllRecipes, useFooterInfo } from "@/hooks/cms.queries";
import { Loader } from "@/components/loader/Loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ButtonTransparent from "@/components/buttons/ButtonTransparent";

import {
  LoadingSvg,
  LoveSvg,
  SearchSvg,
  StarSvg2,
} from "@/components/svg-container/SvgContainer";
import { Link, NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/", title: "Home" },
  { path: "/recipe-library", title: "Recipe library" },
  { path: "/dashboard/overview", title: "Dashboard" },
  { path: "/dashboard/share-recipes", title: "Share recipe" },
  { path: "/meal-planner", title: "Meal planner" },
  { path: "/blog", title: "Blog" },
];

const Navbar = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { mutate: logOutMutate } = useLogOut();
  const [isOpen, setOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation()?.pathname;
  const { data: siteSettings, isLoading } = useFooterInfo();
  const { data: results, isLoading: resultLoading } = useAllRecipes(
    0,
    0,
    0,
    0,
    search
  );

  // Mutation
  const handleLogout = () => {
    logOutMutate();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (isLoading) {
    document.body.style.overflow = "hidden";
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  } else {
    document.body.style.overflow = "";
  }

  return (
    <header className="py-1 lg:py-2 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] bg-[#F6F5F2] fixed w-full left-0 top-0 z-50 navbar">
      <nav className="container w-full">
        <div className="flex justify-between items-center lg:px-3 xl:px-5 3xl:px-0">
          {/* Left side */}
          <div className="flex items-center gap-7">
            {/* logo */}
            <Link to="/">
              <figure className="w-[80px] h-[70px] lg:w-[100px] lg:h-[87px]">
                <img
                  className="w-full h-full object-cover"
                  src={`${import.meta.env.VITE_SITE_URL}/${siteSettings?.logo}`}
                  alt="logo"
                />
              </figure>
            </Link>

            {/* desktop search bar */}
            <div className="px-3 3xl:px-4 py-3 hidden 2xl:flex items-center gap-1 3xl:gap-2 rounded-full shadow-[0px_0px_6px_0px_rgba(0,0,0,0.04)] bg-white w-[250px] 3xl:w-[380px]">
              <SearchSvg />
              <form className="w-full relative">
                <input
                  type="search"
                  placeholder="Search for recipes name ..."
                  className="focus:outline-none w-full placeholder:text-sm 3xl:placeholder:text-base"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </form>

              {search.trim() && (
                <div className="bg-white w-[450px] border border-gray-200 shadow-sm rounded-[16px] pb-4 px-4 max-h-[400px] overflow-y-auto absolute top-[80px] z-50">
                  <h3 className="text-lg font-semibold pt-3 pb-2 sticky top-0 bg-white">
                    Search Results
                  </h3>

                  {resultLoading ? (
                    <div className="flex justify-center py-6 ">
                      <LoadingSvg />
                    </div>
                  ) : results === undefined ? (
                    <p className="text-center text-gray-500">
                      No results found.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {results?.map((item, idx) => (
                        <Link
                          to={`recipe-details/${item?.id}`}
                          target="_blank"
                          key={idx}
                          className="flex justify-between items-center border-b pb-3 cursor-pointer"
                        >
                          {/* Left Side */}
                          <div className="flex justify-center gap-2 items-center">
                            <figure className="w-16 rounded h-12 overflow-hidden">
                              <img
                                className="w-full h-full object-cover rounded"
                                src={`${import.meta.env.VITE_SITE_URL}/${
                                  item?.recipe_image
                                }`}
                              />
                            </figure>
                            <div>
                              <p className="font-medium text-black">
                                {item?.recipe_name?.length > 40
                                  ? item.recipe_name.slice(0, 40) + "..."
                                  : item?.recipe_name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Category: {item?.category_name || "N/A"}
                              </p>
                            </div>
                          </div>

                          {/* Right Side */}
                          <p className="text-sm flex gap-1 items-center font-semibold text-[#000]">
                            <span className="w-4 h-4">
                              <StarSvg2 />
                            </span>
                            {item?.average_rating}
                          </p>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden 2xl:flex items-center gap-10">
            {/* nav links */}
            <div className="flex gap-4 3xl:gap-5">
              {navLinks.map(item => (
                <NavLink
                  to={item.path}
                  key={item.title}
                  className={({ isActive }) =>
                    `${
                      isActive ||
                      (location?.startsWith("/recipe-details") &&
                        item.path === "/recipe-library")
                        ? "text-primary"
                        : "text-textColor"
                    } hover:text-primary duration-300 transition-all text-[15px] 3xl:text-base`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>

            {/* cta section */}
            <div className="flex gap-3 3xl:gap-5 items-center">
              <Link
                to="/dashboard/saved-recipes"
                className="size-10 rounded-full bg-[#FDE0B8] inline-flex items-center justify-center"
              >
                <LoveSvg />
              </Link>
              {user ? (
                <div className="flex gap-2 3xl:gap-3 items-center">
                  {/* Logout btn */}
                  <button onClick={handleLogout}>
                    <ButtonTransparent title="Log Out" />
                  </button>

                  {/* Avatar */}
                  <Link to="/dashboard/settings">
                    <Avatar className="size-11 rounded-full cursor-pointer">
                      <AvatarFallback className="text-lg lg:text-[22px] font-medium w-full h-full rounded-full">
                        {user?.name.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              ) : (
                <ButtonTransparent path="/auth/register" title="Sign Up" />
              )}
            </div>
          </div>

          {/* Hamburger btn */}
          <div className="2xl:hidden flex gap-3 items-center">
            <button onClick={() => setSearchModalOpen(true)}>
              <SearchSvg />
            </button>

            {user && (
              <Link to="/dashboard/settings">
                <Avatar className="size-10 lg:size-11 rounded-full cursor-pointer">
                  <AvatarFallback className="text-lg lg:text-[22px] font-medium w-full h-full rounded-full">
                    {user?.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
            <button
              onClick={() => setOpen(!isOpen)}
              className="bg-primary text-white w-9 h-9 sm:w-10 sm:h-10 rounded grid place-items-center"
            >
              <FaBars className="text-[22px] sm:text-2xl" />
            </button>
          </div>
        </div>
      </nav>

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
        } duration-500 transition-transform fixed top-0 z-[999] left-0 bg-white p-5 lg:p-7 shadow-lg overflow-y-auto  border-r max-h-screen min-h-screen w-[250px] lg:w-[270px] 2xl:hidden`}
      >
        {/* logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <figure className="w-[100px] h-[90px]">
            <img
              className="object-cover w-full h-full mx-auto"
              src={`${import.meta.env.VITE_SITE_URL}/${siteSettings?.logo}`}
              alt="logo"
            />
          </figure>
        </Link>

        <div className="flex flex-col mt-7 gap-6">
          {/* tabs */}
          <div className="flex flex-col gap-5 xl:gap-6">
            {navLinks?.map(item => (
              <NavLink
                onClick={() => setOpen(false)}
                to={item?.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-primary" : "text-textColor"
                  } hover:text-primary duration-300 transition-all`
                }
                key={item?.title}
              >
                {item?.title}
              </NavLink>
            ))}
          </div>
          {/* cta */}
          <div className="flex gap-3 items-center lg:mt-2">
            <Link
              to="/dashboard/saved-recipes"
              className="size-10 rounded-full bg-[#FDE0B8] inline-flex items-center justify-center  "
            >
              <LoveSvg />
            </Link>

            {/* Sign Up And Logout btns */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-textColor font-merriweather px-5 py-2 border rounded-full border-primary hover:bg-primary transition-all duration-300 hover:text-white"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/auth/register"
                className="text-textColor font-merriweather px-5 py-2 border rounded-full border-primary hover:bg-primary transition-all duration-300 hover:text-white"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>

        {/* Cancel btn */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3"
        >
          <RxCross2 className="text-xl" />
        </button>
      </div>

      {/* Mobile Search bar */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          onClick={() => {
            setSearch("");
            setSearchModalOpen(false);
          }}
        >
          <div
            className="bg-white w-[calc(100%-30px)] md:max-w-md p-4 md:p-6 rounded-lg shadow-lg relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setSearchModalOpen(false);
                setSearchInput("");
              }}
              className="absolute top-1.5 md:top-2 right-1.5 md:right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <RxCross2 />
            </button>

            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded px-3 md:px-4 py-1.5 md:py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            {search.trim() && (
              <div className="bg-white border border-gray-200 shadow-sm rounded-[16px] p-3 md:p-4 max-h-[400px] overflow-y-auto w-full mt-4">
                {resultLoading ? (
                  <div className="flex justify-center py-6 ">
                    <LoadingSvg />
                  </div>
                ) : results === undefined ? (
                  <p className="text-center text-gray-500">No results found.</p>
                ) : (
                  <ul className="space-y-4">
                    {results?.map((item, idx) => (
                      <Link
                        to={`recipe-details/${item?.id}`}
                        target="_blank"
                        key={idx}
                        className="flex justify-between items-center gap-3 border-b pb-3 cursor-pointer"
                      >
                        {/* Left Side */}
                        <div className="flex justify-center gap-2 items-center">
                          <figure className="w-14 shrink-0 rounded h-12 overflow-hidden">
                            <img
                              className="w-full h-full object-cover rounded"
                              src={`${import.meta.env.VITE_SITE_URL}/${
                                item?.recipe_image
                              }`}
                            />
                          </figure>
                          <div>
                            <p className="font-medium text-black text-sm md:text-base">
                              {item?.recipe_name?.length > 40
                                ? item.recipe_name.slice(0, 40) + "..."
                                : item?.recipe_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Category: {item?.category_name || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Right Side */}
                        <p className="text-sm shrink-0 hidden md:flex gap-1 items-center font-semibold text-[#000]">
                          <span className="w-4 h-4">
                            <StarSvg2 />
                          </span>
                          {item?.average_rating}
                        </p>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
