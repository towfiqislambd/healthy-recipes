import ButtonTransparent from '@/components/buttons/ButtonTransparent';
import { LoveSvg, SearchSvg } from '@/components/svg-container/SvgContainer';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import useAuth from '@/hooks/useAuth';
import { useLogOut } from '@/hooks/auth.hook.';
import { useFooterInfo } from '@/hooks/cms.queries';
import { Loader } from '@/components/loader/Loader';

const Navbar = () => {
  const navigate = useNavigate()
  const { user, setSearch } = useAuth();
  const { mutate: logOutMutate } = useLogOut();
  const [isOpen, setOpen] = useState(false);
  const location = useLocation()?.pathname;

  // Mutation
  const handleLogout = () => {
    logOutMutate()
  }

  const navLinks = [
    { path: '/', title: 'Home' },
    { path: '/recipe-library', title: 'Recipe library' },
    { path: '/dashboard/overview', title: 'Dashboard' },
    { path: '/dashboard/dashboard-share-recipes', title: 'Share recipe' },
    { path: '/meal-planner', title: 'Meal planner' },
    { path: '/blog', title: 'Blog' },
  ];

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

  const { data: siteSettings, isLoading } = useFooterInfo();

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><Loader /></div>;
  }

  const handleSearch = () => {
    navigate('/meal-planner')
  }

  return (
    <header className='py-1 lg:py-2 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] bg-[#F6F5F2] fixed w-full left-0 top-0 z-50 navbar'>
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
                  alt="logo" />
              </figure>
            </Link>

            {/* search bar */}
            <div className='px-3 3xl:px-4 py-3 hidden 2xl:flex items-center gap-1 3xl:gap-2 rounded-full shadow-[0px_0px_6px_0px_rgba(0,0,0,0.04)] bg-white w-[300px] 3xl:w-[380px]'>
              <SearchSvg />
              <input
                className="focus:outline-none w-full placeholder:text-[15px] 3xl:placeholder:text-base"
                placeholder="Search for recipes name..."
                type="text"
                name="search"
                id="search"
                onClick={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="hidden 2xl:flex items-center gap-10">
            {/* nav links */}
            <div className="flex gap-5">
              {navLinks.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.title}
                  className={({ isActive }) =>
                    `${isActive ||
                      (location?.startsWith('/recipe-details') && item.path === '/recipe-library')
                      ? 'text-primary'
                      : 'text-textColor'
                    } hover:text-primary duration-300 transition-all text-[15px] 3xl:text-base`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>

            {/* cta section */}
            <div className="flex gap-5 items-center">
              <Link to="/dashboard/dashboard-saved-recipes" className="size-10 rounded-full bg-[#FDE0B8] inline-flex items-center justify-center">
                <LoveSvg />
              </Link>
              {
                user ?
                  <button onClick={handleLogout}>
                    <ButtonTransparent title="Log Out" />
                  </button>
                  :
                  <ButtonTransparent path="/auth/register" title="Sign Up" />
              }
            </div>
          </div>

          {/* Hamburger btn */}
          <button
            onClick={() => setOpen(!isOpen)}
            className="bg-primary 2xl:hidden text-white w-10 h-10 rounded grid place-items-center"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </nav>

      {/* Blur Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 2xl:hidden z-[999] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      </div>

      {/* Mobile Sidebar */}
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} duration-500 transition-transform fixed top-0 z-[999] left-0 bg-white p-5 lg:p-7 shadow-lg overflow-y-auto  border-r max-h-screen min-h-screen w-[250px] lg:w-[270px] 2xl:hidden`}
      >
        {/* logo */}
        <Link to="/">
          <figure className="w-[90px] h-[80px]">
            <img
              className="object-cover w-full h-full mx-auto"
              src={`${import.meta.env.VITE_SITE_URL}/${siteSettings?.logo}`}
              alt="logo" />
          </figure>
        </Link>

        <div className="flex flex-col mt-7 lg:mt-10 gap-6">
          {/* tabs */}
          <div className="flex flex-col gap-5 xl:gap-6">
            {navLinks?.map((item) => (
              <NavLink
                onClick={() => setOpen(false)}
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
          <div className="flex gap-3 items-center lg:mt-2">
            <Link to="/dashboard/dashboard-saved-recipes" className="size-10 rounded-full bg-[#FDE0B8] inline-flex items-center justify-center  ">
              <LoveSvg />
            </Link>

            {/* Sign Up And Logout btns */}
            {
              user ?
                <button
                  onClick={handleLogout}
                  className="text-textColor font-merriweather px-5 py-2 border rounded-full border-primary hover:bg-primary transition-all duration-300 hover:text-white"
                >
                  Log Out
                </button>
                :
                <Link
                  to='/auth/register'
                  className="text-textColor font-merriweather px-5 py-2 border rounded-full border-primary hover:bg-primary transition-all duration-300 hover:text-white"
                >
                  Sign Up
                </Link>
            }

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
    </header>
  );
};

export default Navbar;
