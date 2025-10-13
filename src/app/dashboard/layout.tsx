"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/Assets/images/logo.png";
import { usePathname } from "next/navigation";
import PrivateLayout from "@/Private/PrivateLayout";
import DashboardHeader from "@/Shared/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

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
        <DashboardHeader setOpen={setOpen} isOpen={isOpen} />

        {/* Dashboard Body */}
        <div className="flex mt-[75px] lg:mt-[90px] h-[calc(100vh-90px)] bg-white relative">
          {/* Sidebar */}
          <aside
            className={`${
              isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
            } xl:static w-60 2xl:w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto pt-7 h-full shrink-0 fixed top-0 left-0 duration-500 transition-transform z-[999]`}
          >
            <Link href="/" className="block xl:hidden">
              <figure className="w-[80px] h-[70px] lg:w-[100px] mx-auto lg:h-[87px] relative">
                <Image
                  className="w-full h-full object-cover"
                  fill
                  src={logo}
                  alt="logo"
                />
              </figure>
            </Link>

            <ul className="text-[#5A5C5F] font-medium space-y-2 2xl:space-y-3">
              {sidebarLinks.map(link => {
                const isActive = pathname === link.path;

                return (
                  <Link
                    key={link?.path}
                    href={link?.path}
                    onClick={() => setOpen(false)}
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

          {/* Outlet */}
          <main
            className={`flex-1 overflow-y-auto bg-gray-50 ${
              pathname !== "/dashboard/overview" ? "p-4 sm:p-5" : "lg:p-5"
            }`}
          >
            {children}
          </main>
        </div>

        {/* Blur Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-primary-black/30 backdrop-blur-sm transition-opacity duration-300 2xl:hidden z-50 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      </section>
    </PrivateLayout>
  );
}
