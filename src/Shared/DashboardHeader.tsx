"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import logo from "@/Assets/images/logo.png";
import { LoveSvg } from "@/Components/Svg/SvgContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

const navLinks = [
  { path: "/", title: "Home" },
  { path: "/recipe-library", title: "Recipe library" },
  { path: "/dashboard/share-recipes", title: "Share recipe" },
  { path: "/meal-planner", title: "Meal planner" },
  { path: "/blog", title: "Blog" },
];

const DashboardHeader = ({ setOpen, setOpenPopup, openPopup, isOpen }: any) => {
  const { user } = useAuth();

  return (
    <header className="py-1 px-5 3xl:px-20 border-b bg-[#F6F5F2] fixed xl:h-[90px] w-full left-0 top-0 z-50">
      <nav className="w-full flex justify-between items-center">
        {/* Left - Logo*/}
        <div className="flex items-center xl:gap-5 2xl:gap-14">
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
        </div>

        {/* Right */}
        <div className="flex items-center gap-5 xl:gap-10 2xl:gap-20">
          {/* NavLinks */}
          <div className="hidden xl:flex xl:gap-5">
            {navLinks?.map(link => (
              <Link
                href={link?.path}
                key={link?.title}
                className="hover:text-primary duration-300 transition-all text-textColor"
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

            {/* Profile Info */}
            <button onClick={() => setOpenPopup(!openPopup)}>
              <Avatar className="size-10 lg:size-11 rounded-full cursor-pointer border border-gray-200">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${user?.avatar}`}
                />

                <AvatarFallback className="text-lg lg:text-[22px] font-medium w-full h-full rounded-full bg-gray-200">
                  {user?.name?.at(0)}
                </AvatarFallback>
              </Avatar>
            </button>

            {/* Mobile btns */}
            <button
              onClick={() => setOpen(!isOpen)}
              className="bg-primary text-white w-9 h-9 sm:w-10 sm:h-10 rounded grid 2xl:hidden place-items-center"
            >
              <FaBars className="text-[22px] sm:text-2xl" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
