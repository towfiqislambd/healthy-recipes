import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import logo from '../assets/images/logo.png';
import { LoveSvg, SearchSvg } from "@/components/svg-container/SvgContainer";
import ButtonTransparent from "@/components/buttons/ButtonTransparent";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import profile from "../assets/images/profile.png"

const DashboardLayout = () => {
    const location = useLocation()?.pathname;
    const [isOpen, setOpen] = useState(false);
    const navLinks = [
        {
            path: '/',
            title: 'Home',
        },
        {
            path: '/recipe-library',
            title: 'Recipe library',
        },
        {
            path: '/dashboard/dashboard-share-recipes',
            title: 'Share recipe',
        },
        {
            path: '/meal-planner',
            title: 'Meal planner',
        },
        {
            path: '/blog',
            title: 'Blog',
        },
    ];
    return (
        <section className="min-h-screen max-h-screen flex flex-col">
            {/* Dashboard Header */}
            <header className={`py-1 px-20 border-b bg-[#F6F5F2]  fixed h-[90px] w-full left-0 top-0 z-50 navbar`}>
                <nav className="w-full flex justify-between items-center md:px-0 lg:px-0 px-5">
                    {/* left side contents */}
                    <div className="flex items-center xl:gap-5 2xl:gap-14">
                        {/* logo */}
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                        {/* search bar */}
                        <div className={`px-3 py-[10px] hidden xl:flex items-center gap-2 rounded-full shadow-[0px_0px_6px_0px_rgba(0,0,0,0.04)] bg-white 2xl:min-w-[420px]`}>
                            <SearchSvg />
                            <input
                                className="focus:outline-none w-full"
                                placeholder="Search for recipes by ingredients..."
                                type="text"
                                name="search"
                                id="search"
                            />
                        </div>
                    </div>

                    {/* right side contents */}
                    <div className="flex items-center xl:gap-10 2xl:gap-20">
                        {/* nav links */}
                        <div className="hidden xl:flex xl:gap-5 2xl:gap-5">
                            {navLinks?.map((item) => (
                                <NavLink
                                    to={item?.path}
                                    className={({ isActive }) =>
                                        `${isActive ||
                                            (location?.startsWith('/recipe-details') &&
                                                item.path === '/recipe-library')
                                            ? 'text-primary '
                                            : 'text-textColor'
                                        }
      hover:text-primary duration-300 transition-all`
                                    }
                                    key={item?.title}
                                >
                                    {item?.title}
                                </NavLink>
                            ))}
                        </div>
                        {/* cta section */}
                        <div className="hidden xl:flex xl:gap-2 2xl:gap-5 items-center">
                            <Link className="size-10 rounded-full bg-[#FDE0B8] inline-flex items-center justify-center  ">
                                <LoveSvg />
                            </Link>

                            <figure className="w-12 h-12 rounded-full">
                                <img src={profile} alt="" className="w-full h-full rounded-full" />
                            </figure>
                        </div>
                    </div>
                    {/*  */}
                    {/* Hamburger btn */}
                    <button
                        onClick={() => setOpen(!isOpen)}
                        className="bg-primary xl:hidden text-white w-10 h-10 lg:w-14 lg:h-12 rounded grid place-items-center"
                    >
                        <FaBars className="text-2xl lg:text-3xl" />
                    </button>
                    {/* Blur Overlay */}
                    <div
                        onClick={() => setOpen(false)}
                        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 xl:hidden z-[999] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                    ></div>
                    {/* Sidebar */}
                    <div
                        className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
                            } duration-500 transition-transform fixed top-0 z-[999] left-0 bg-white py-10 shadow-lg overflow-y-auto  border-r max-h-screen min-h-screen w-[270px] xl:hidden`}
                    >
                        {/* logo */}
                        <Link to="/" className="size-[80px]">
                            <img className="object-cover mx-auto" src={logo} alt="Logo" />
                        </Link>
                        <div className="flex items-center gap-2 md:px-5 px-3 md:py-4 py-2 rounded-full shadow-[0px_0px_6px_0px_rgba(0,0,0,0.04)] bg-white min-w-[100px] mx-5 md:mx-0 mt-5 md:mt-0">
                            <SearchSvg />
                            <input
                                className="focus:outline-none w-full"
                                placeholder="Search for recipes by ingredients..."
                                type="text"
                                name="search"
                                id="search"
                            />
                        </div>
                        <div className="flex flex-col mt-5 items-center gap-6">
                            {/* tabs */}
                            <div className="flex flex-col gap-5">
                                {navLinks?.map((item) => (
                                    <NavLink
                                        to={item?.path}
                                        className={({ isActive }) =>
                                            `${isActive ? 'text-primary' : 'text-textColor'
                                            } hover:text-primary duration-300 transition-all`
                                        }
                                        key={item?.title}
                                    >
                                        {item?.title}
                                    </NavLink>
                                ))}
                            </div>
                            {/* cta */}
                            <div className="flex flex-col gap-5 items-start">
                                <Link className="size-10 rounded-full bg-[#FDE0B8] inline-flex items-center justify-center  ">
                                    <LoveSvg />
                                </Link>

                                {/* button */}
                                <ButtonTransparent title="Sign Up" />
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
                </nav>
            </header>

            {/* Dashboard Content */}
            <div className="flex mt-[90px] h-[calc(100vh-90px)] bg-white">
                {/* Sidebar */}
                <aside className="w-[237px] bg-[#F6F7FB] overflow-y-auto pt-7 h-full">
                    <ul className="text-[#5A5C5F] font-medium space-y-3">
                        <li>
                            <NavLink
                                to="/dashboard/overview"
                                className={({ isActive }) =>
                                    `px-7 py-3 block w-full duration-300 transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white text-[#5A5C5F]'
                                    }`
                                }
                            >
                                Overview
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/dashboard-meal-planner"
                                className={({ isActive }) =>
                                    `px-7 py-3 block w-full duration-300 transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white text-[#5A5C5F]'
                                    }`
                                }
                            >
                                Meal planner
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/dashboard-share-recipes"
                                className={({ isActive }) =>
                                    `px-7 py-3 block w-full duration-300 transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white text-[#5A5C5F]'
                                    }`
                                }
                            >
                                Share recipes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/dashboard-my-recipes"
                                className={({ isActive }) =>
                                    `px-7 py-3 block w-full duration-300 transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white text-[#5A5C5F]'
                                    }`
                                }
                            >
                                My recipes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/dashboard-saved-recipes"
                                className={({ isActive }) =>
                                    `px-7 py-3 block w-full duration-300 transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white text-[#5A5C5F]'
                                    }`
                                }
                            >
                                Saved recipes
                            </NavLink>
                        </li>
                    </ul>
                </aside>
                {/* Outlet */}
                <main className='flex-1 overflow-y-auto p-5'>
                    <Outlet />
                </main>
            </div>
        </section>
    );
};

export default DashboardLayout;