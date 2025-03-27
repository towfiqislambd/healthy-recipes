import ButtonTransparent from '@/components/buttons/ButtonTransparent';
import {
  LogoSvg,
  LoveSvg,
  SearchSvg,
} from '@/components/svg-container/SvgContainer';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
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
      path: '/dashboard/home',
      title: 'Dashboard',
    },
    {
      path: '/share-recipe',
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
    <header className="py-6 bg-[#F6F5F2] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] fixed w-full left-0 top-0">
      <nav className="container w-full flex justify-between items-center">
        {/* left side contents */}
        <div className="flex items-center gap-14">
          {/* logo */}
          <Link to="/">
            <LogoSvg />
          </Link>

          {/* search bar */}
          <div className="flex items-center gap-2 px-5 py-4 rounded-full shadow-[0px_0px_6px_0px_rgba(0,0,0,0.04)] bg-white min-w-[420px]">
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
        <div className="flex items-center gap-20">
          {/* nav links */}
          <div className="flex gap-5">
            {navLinks?.map((item) => (
              <NavLink
                to={item?.path}
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-primary' : 'text-textColor'
                  } hover:text-primary duration-300 transition-all`
                }
                key={item?.title}
              >
                {item?.title}
              </NavLink>
            ))}
          </div>

          {/* cta section */}
          <div className="flex gap-5 items-center">
            <Link className="size-10 rounded-full bg-[#FDE0B8] inline-flex items-center justify-center  ">
              <LoveSvg />
            </Link>

            {/* button */}
            <ButtonTransparent title="Sign Up" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
