"use client";
import {
  LoadingSvg,
  LoveSvg,
  SearchSvg,
  StarSvg2,
} from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/Hooks/useAuth";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import logo from "@/Assets/images/logo.png";
import Button from "@/Components/Common/Button";
import { useLogout } from "@/Hooks/api/auth_api";
import { usePathname } from "next/navigation";
import Container from "@/Components/Common/Container";
import { getAllRecipesPublic } from "@/Hooks/api/cms_api";
import { MdLogout } from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

const navLinks = [
  { id: 1, path: "/", title: "Home" },
  { id: 2, path: "/recipe-library", title: "Recipe library" },
  { id: 3, path: "/dashboard/overview", title: "Dashboard" },
  { id: 4, path: "/dashboard/share-recipes", title: "Share recipe" },
  { id: 5, path: "/meal-planner", title: "Meal planner" },
  { id: 6, path: "/blog", title: "Blog" },
];

const Navbar = () => {
  // Hook
  const { user } = useAuth();
  const pathname = usePathname();

  // States
  const [search, setSearch] = useState<string>("");
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Mutation & Query
  const { mutate: logoutMutation, isPending } = useLogout();
  const { data: results, isLoading: resultLoading } = getAllRecipesPublic({
    search,
  });

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

  useEffect(() => {
    const handleWindowClick = () => {
      setOpenPopup(false);
      setSearch("");
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <header className="py-1 lg:py-2 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] bg-[#F6F5F2] sticky w-full left-0 top-0 z-50">
      <Container>
        <nav className="w-full relative">
          <div className="flex justify-between items-center lg:px-3 xl:px-5 3xl:px-0">
            {/* Left */}
            <div className="flex items-center gap-7">
              {/* Logo */}
              <Link href="/">
                <figure className="w-[80px] h-[70px] lg:w-[100px] lg:h-[87px] relative">
                  <Image
                    fill
                    className="w-full h-full object-cover"
                    src={logo}
                    alt="logo"
                  />
                </figure>
              </Link>

              {/* Search Bar */}
              <div
                onClick={e => e.stopPropagation()}
                className="px-3 3xl:px-4 py-3 hidden 2xl:flex items-center gap-1 3xl:gap-2 rounded-full shadow-[0px_0px_6px_0px_rgba(0,0,0,0.04)] bg-white w-[250px] 3xl:w-[380px]"
              >
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
                        {results?.data?.map((item: any, idx: number) => (
                          <Link
                            key={idx}
                            href={`/recipe-details/${item?.id}`}
                            target="_blank"
                            className="flex justify-between items-center border-b border-gray-200 pb-3 cursor-pointer"
                          >
                            <div className="flex justify-center gap-2 items-center">
                              <figure className="w-16 rounded h-12 overflow-hidden relative">
                                <Image
                                  className="w-full h-full object-cover rounded"
                                  fill
                                  alt="image"
                                  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.recipe_image}`}
                                />
                              </figure>
                              <div>
                                <p className="font-medium text-primary-black">
                                  {item?.recipe_name?.length > 40
                                    ? item.recipe_name.slice(0, 40) + "..."
                                    : item?.recipe_name}
                                </p>

                                <p className="text-sm text-gray-500">
                                  Category: {item?.category_name || "N/A"}
                                </p>
                              </div>
                            </div>

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

            {/* Right - Nav Links */}
            <div className="flex items-center gap-10">
              <div className="hidden 2xl:flex gap-4 3xl:gap-5">
                {navLinks?.map(link => {
                  const isActive = pathname === link.path;

                  return (
                    <Link
                      key={link?.id}
                      href={link?.path}
                      className={`hover:text-primary-orange duration-300 transition-all text-[15px] 3xl:text-base ${
                        isActive ? "text-primary-orange" : "text-accent-gray"
                      }`}
                    >
                      {link?.title}
                    </Link>
                  );
                })}
              </div>

              {/* Cta section */}
              <div className="flex gap-3 3xl:gap-5 items-center">
                <button
                  className="2xl:hidden"
                  onClick={() => setSearchModalOpen(true)}
                >
                  <SearchSvg />
                </button>

                <Link
                  href="/dashboard/saved-recipes"
                  className="size-10 rounded-full bg-[#FDE0B8] hidden 2xl:inline-flex items-center justify-center"
                >
                  <LoveSvg />
                </Link>

                {user ? (
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      setOpenPopup(!openPopup);
                    }}
                    className="relative block"
                  >
                    <figure className="size-10 lg:size-12 bg-primary-orange rounded-full cursor-pointer relative grid place-items-center shrink-0">
                      {user?.avatar ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SITE_URL}/${user?.avatar}`}
                          alt="user"
                          fill
                          className="size-full rounded-full object-cover"
                        />
                      ) : (
                        <p className="text-lg lg:text-[22px] font-medium text-white rounded-full">
                          {user?.name.slice(0, 1)}
                        </p>
                      )}
                    </figure>

                    {/* Account Modal */}
                    <div
                      onClick={e => e.stopPropagation()}
                      className={`bg-gray-100 z-50 rounded-xl w-64 lg:w-[260px] 3xl:w-[270px] absolute right-2 2xl:right-0 top-[65px] mt-2 shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-4 3xl:p-5 transition-all duration-300 ${
                        openPopup
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <div className="flex gap-3 md:gap-4 items-center mb-4 lg:mb-5">
                        <figure className="size-10 lg:size-12 bg-primary-orange rounded-full cursor-pointer relative grid place-items-center shrink-0">
                          {user?.avatar ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_SITE_URL}/${user?.avatar}`}
                              alt="user"
                              fill
                              className="size-full rounded-full object-cover"
                            />
                          ) : (
                            <p className="text-lg lg:text-[22px] font-medium text-white rounded-full">
                              {user?.name.at(0)}
                            </p>
                          )}
                        </figure>

                        <div>
                          <h3 className="font-semibold truncate">
                            {user?.name}
                          </h3>
                          <p className="text-gray-500 text-sm w-44 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <hr className="text-gray-300" />

                      <div className="mt-4 font-medium flex gap-2.5 lg:gap-3.5 3xl:gap-4 flex-col text-gray-700 text-sm lg:text-[15px]">
                        <Link
                          href="/dashboard/settings"
                          className="w-fit flex gap-2 items-center cursor-pointer hover:text-primary-blue duration-200"
                        >
                          <IoSettingsOutline />
                          Settings
                        </Link>

                        <button
                          disabled={isPending}
                          onClick={() => logoutMutation()}
                          className={`text-left text-red-500 w-fit flex gap-2 items-center ${
                            isPending ? "!cursor-not-allowed" : "cursor-pointer"
                          }`}
                        >
                          {isPending ? (
                            <div className="flex gap-2 items-center">
                              <BiLoaderCircle className="animate-spin text-red-500" />
                              <span>Signing out...</span>
                            </div>
                          ) : (
                            <p className="flex gap-1 items-center">
                              <MdLogout />
                              Sign Out
                            </p>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    path="/auth/register"
                    text="Sign Up"
                    className="!py-1.5 lg:!py-2 2xl:!py-2.5 3xl:!py-3 !px-4 lg:!px-5 3xl:!px-8"
                  />
                )}

                <button
                  onClick={() => setOpen(!isOpen)}
                  className="bg-primary-orange text-white w-9 h-9 sm:w-10 sm:h-10 rounded grid 2xl:hidden place-items-center"
                >
                  <FaBars className="text-[22px] sm:text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </Container>

      {/* Blur Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-primary-black/30 backdrop-blur-sm transition-opacity duration-300 2xl:hidden z-[999] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } duration-500 transition-transform fixed top-0 z-[999] left-0 bg-white p-5 lg:p-7 shadow-lg overflow-y-auto  border-r max-h-screen min-h-screen w-[250px] lg:w-[270px] 2xl:hidden`}
      >
        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)}>
          <figure className="w-[100px] h-[90px] relative">
            <Image
              className="object-cover w-full h-full mx-auto"
              src={`${process.env.NEXT_PUBLIC_SITE_URL}/${logo}`}
              alt="logo"
              fill
            />
          </figure>
        </Link>

        <div className="flex flex-col mt-7 gap-6">
          <div className="flex flex-col gap-5 xl:gap-6">
            {navLinks?.map(link => {
              const isActive = pathname === link?.path;

              return (
                <Link
                  key={link?.id}
                  onClick={() => setOpen(false)}
                  href={link?.path}
                  className={`hover:text-primary-orange duration-300 transition-all text-[15px] 3xl:text-base ${
                    isActive ? "text-primary-orange" : "text-accent-gray"
                  }`}
                >
                  {link?.title}
                </Link>
              );
            })}
          </div>

          {/* Cta */}
          <div className="flex gap-3 items-center lg:mt-2">
            <Link
              href="/dashboard/saved-recipes"
              className="size-10 rounded-full bg-[#FDE0B8] inline-flex items-center justify-center  "
            >
              <LoveSvg />
            </Link>
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
          className="fixed inset-0 bg-primary-black/50 z-50 flex items-start justify-center pt-10"
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
              }}
              className="absolute top-1.5 md:top-2 right-1.5 md:right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <RxCross2 />
            </button>

            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded px-3 md:px-4 py-1.5 md:py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary-orange"
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
                    {results?.data?.map((item: any, idx: any) => (
                      <Link
                        key={idx}
                        href={`recipe-details/${item?.id}`}
                        target="_blank"
                        className="flex justify-between items-center gap-3 border-b border-gray-200 pb-3 cursor-pointer"
                      >
                        {/* Left Side */}
                        <div className="flex justify-center gap-2 items-center">
                          <figure className="w-14 shrink-0 rounded h-12 overflow-hidden relative">
                            <Image
                              fill
                              alt="recipe image"
                              className="w-full h-full object-cover rounded"
                              src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.recipe_image}`}
                            />
                          </figure>
                          <div>
                            <p className="font-medium text-primary-black text-sm md:text-base">
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
