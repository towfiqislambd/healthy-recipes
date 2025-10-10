"use client";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import React, { useEffect, useState } from "react";
import logo from "@/Assets/images/logo.png";
import { IoSettingsOutline } from "react-icons/io5";
import { useLogout } from "@/Hooks/api/auth_api";
import { MdLogout } from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";
import { LoveSvg } from "@/Components/Svg/SvgContainer";

const navLinks = [
  { path: "/", title: "Home" },
  { path: "/recipe-library", title: "Recipe library" },
  { path: "/dashboard/share-recipes", title: "Share recipe" },
  { path: "/meal-planner", title: "Meal planner" },
  { path: "/blog", title: "Blog" },
];

const DashboardHeader = ({ setOpen, isOpen }: any) => {
  const { user } = useAuth();
  const { mutate: logoutMutation, isPending } = useLogout();
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const handleWindowClick = () => {
      setOpenPopup(false);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <header className="py-1 px-5 3xl:px-20 bg-accent-white border border-accent-white fixed xl:h-[90px] left-0 top-0 z-50 w-full flex justify-between items-center">
      {/* Left - Logo*/}
      <Link href="/">
        <figure className="w-[80px] h-[70px] lg:w-[100px] lg:h-[87px] relative">
          <Image
            className="w-full h-full object-cover"
            fill
            src={logo}
            alt="logo"
          />
        </figure>
      </Link>

      {/* Right */}
      <div className="flex items-center gap-5 xl:gap-10 2xl:gap-20">
        {/* NavLinks */}
        <div className="hidden xl:flex xl:gap-5">
          {navLinks?.map(link => (
            <Link
              href={link?.path}
              key={link?.title}
              className="hover:text-primary-orange duration-300 transition-all text-accent-gray"
            >
              {link?.title}
            </Link>
          ))}
        </div>

        <div className="flex gap-3 2xl:gap-5 items-center">
          {/* Wishlist Icon */}
          <Link
            href="/dashboard/saved-recipes"
            className="size-10 rounded-full bg-[#FDE0B8] hidden xl:inline-flex items-center justify-center"
          >
            <LoveSvg />
          </Link>

          {/* Profile Modal */}
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
                  <h3 className="font-semibold truncate">{user?.name}</h3>
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

          {/* Mobile Bar */}
          <button
            onClick={() => setOpen(!isOpen)}
            className="bg-primary-orange text-white w-9 h-9 sm:w-10 sm:h-10 rounded grid 2xl:hidden place-items-center"
          >
            <FaBars className="text-[22px] sm:text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
