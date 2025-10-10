"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import useAuth from "@/Hooks/useAuth";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import PrivateLayout from "@/Private/PrivateLayout";
import { useLogout } from "@/Hooks/api/auth_api";
import { BiLoaderCircle } from "react-icons/bi";
import { getSiteSettingsClient } from "@/Hooks/api/cms_api";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import DashboardHeader from "@/Shared/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const { mutate: logOutMutate, isPending } = useLogout();
  const { data: siteSettings } = getSiteSettingsClient();

  const sidebarLinks = [
    { path: "/dashboard/overview", label: "Overview" },
    { path: "/dashboard/meal-planner", label: "Meal planner" },
    { path: "/dashboard/share-recipes", label: "Share recipes" },
    { path: "/dashboard/my-recipes", label: "My recipes" },
    { path: "/dashboard/saved-recipes", label: "Favorite recipes" },
    { path: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <PrivateLayout>
      <section className="min-h-screen max-h-screen flex flex-col">
        {/* Dashboard Header */}
        <DashboardHeader
          setOpen={setOpen}
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
          isOpen={isOpen}
        />

        {/* Layout Body */}
        <div
          onClick={() => setOpenPopup(false)}
          className="flex mt-[75px] lg:mt-[90px] h-[calc(100vh-90px)] bg-white relative"
        >
          {/* Profile Popup */}
          <div
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={`bg-white z-50 rounded-xl w-64 lg:w-72 absolute right-3 md:right-5 top-4 md:top-5 shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-4 md:p-5 transition-all duration-300 ${
              openPopup ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="flex gap-3 md:gap-4 items-center mb-4 lg:mb-5">
              <Avatar className="size-12 rounded-full">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${user?.avatar}`}
                />
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
                href="/dashboard/settings"
              >
                My Profile
              </Link>

              <button
                disabled={isPending}
                onClick={() => logOutMutate()}
                className={`text-left text-red-500 ${
                  isPending ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isPending ? (
                  <span className="flex gap-1 items-center">
                    <BiLoaderCircle className="animate-spin text-red-500" />
                    Signing out...
                  </span>
                ) : (
                  "Sign Out"
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden xl:block xl:w-[210px] 2xl:w-[237px] bg-[#F6F7FB] overflow-y-auto pt-7 h-full">
            <ul className="text-[#5A5C5F] font-medium space-y-2 2xl:space-y-3">
              {sidebarLinks.map(link => {
                const isActive = pathname === link.path;

                return (
                  <Link
                    key={link?.path}
                    href={link?.path}
                    className={`px-6 2xl:px-7 py-[11px] 2xl:py-3 block w-full duration-300 transition-all hover:bg-primary-orange hover:text-white text-[#5A5C5F] ${
                      isActive
                        ? "bg-primary-orange text-white"
                        : "hover:bg-primary-orange hover:text-white text-[#5A5C5F]"
                    }`}
                  >
                    {link?.label}
                  </Link>
                );
              })}
            </ul>
          </aside>

          {/* Page Content */}
          <main
            className={`flex-1 overflow-y-auto ${
              pathname !== "/dashboard/overview" ? "p-4 sm:p-5" : "lg:p-5"
            }`}
          >
            {children}
          </main>
        </div>

        {/* Blur Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-primary-black/30 backdrop-blur-sm transition-opacity duration-300 2xl:hidden z-[999] ${
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
          <Link href="/" onClick={() => setOpen(false)}>
            <figure className="w-[100px] mx-auto h-[80px] relative">
              <Image
                className="object-cover w-full h-full mx-auto"
                fill
                src={`${process.env.NEXT_PUBLIC_SITE_URL}/${siteSettings?.logo}`}
                alt="logo"
              />
            </figure>
          </Link>

          {/* Nav Links */}
          <ul className="text-[#5A5C5F] font-medium space-y-1 2xl:space-y-3 mt-8">
            {sidebarLinks.map(link => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link?.path}
                  href={link?.path}
                  onClick={() => setOpen(false)}
                  className={`px-6 2xl:px-7 py-[11px] 2xl:py-3 block w-full duration-300 transition-all ${
                    isActive
                      ? "bg-primary-orange text-white"
                      : "hover:bg-primary-orange hover:text-white text-[#5A5C5F]"
                  }`}
                >
                  {link?.label}
                </Link>
              );
            })}
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
    </PrivateLayout>
  );
}
