import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {
  FacebookSvg,
  InstagramSvg,
  TwitterSvg,
} from "@/components/svg-container/SvgContainer";

const Footer = () => {
  const exploreData = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Share recipe",
      path: "/share-recipe",
    },
    {
      title: "Meal planner",
      path: "/meal-planner",
    },
    {
      title: "Reviews",
      path: "/reviews",
    },
    {
      title: "Blog",
      path: "/blgo",
    },
  ];
  const recipeLibraryData = [
    {
      title: "Keto diet",
      path: "/keto-diet",
    },
    {
      title: "Mediterranean Diet",
      path: "/mediterranean-diet",
    },
    {
      title: "Vegan Diet",
      path: "/vegan-diet",
    },
    {
      title: "Paleo Diet",
      path: "/paleo-diet",
    },
  ];

  const socialLinks = [
    {
      svg: <FacebookSvg />,
      path: "/",
    },
    {
      svg: <InstagramSvg />,
      path: "/",
    },
    {
      svg: <TwitterSvg />,
      path: "/",
    },
  ];
  return (
    <footer className="bg-[#3A3A3A] pt-5 lg:pt-10 xl:pt-20">
      {/* top section */}
      <section className="container text-white w-full pb-10">
        <div className="flex flex-col gap-5 xl:flex-row justify-between lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="space-y-2">
            <img src={logo} alt="" />
            <p className="max-w-[330px]">
              Lorem ipsum dolor sit amet consectetur. Euismod ultrices non
              lobortis elit id amet integer nec pretium.
            </p>
          </div>

          <div className="">
            <h5 className="text-lg lg:font-medium">Explore</h5>
            <ul className="md:space-y-3 space-y-2 md:mt-4 mt-2">
              {exploreData?.map((item) => (
                <li key={item?.title}>
                  <Link>{item?.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-lg  lg:font-medium">
              Recipe library
            </h5>
            <ul className="md:space-y-3 space-y-2 md:mt-4 mt-2">
              {recipeLibraryData?.map((item) => (
                <li key={item?.title}>
                  <Link>{item?.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-medium">Contact here</h5>

            {/* links */}
            <ul className="mt-4 flex items-center gap-4">
              {socialLinks?.map((item, idx) => (
                <li key={idx}>
                  <Link>{item?.svg}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* bottom section */}
      <section>
        <p className="text-[#D0D0D0] text-center py-5 border-t border-primary">
          © Mohammed Al-Hasani - All rights reserved
        </p>
      </section>
    </footer>
  );
};

export default Footer;
