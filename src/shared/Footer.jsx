import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import {
  FacebookSvg,
  InstagramSvg,
  TwitterSvg,
} from "@/components/svg-container/SvgContainer";
import { useFooterInfo, useRecipeLibrary, useSocialInfo } from "@/hooks/cms.queries";

const Footer = () => {
  const { data: footerInfo } = useFooterInfo();
  const { data: recipeLibrary } = useRecipeLibrary();
  const { data: socialInfo } = useSocialInfo();

  const exploreData = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Share recipe",
      path: "/dashboard/dashboard-share-recipes",
    },
    {
      title: "Meal planner",
      path: "/meal-planner",
    },
    {
      title: "Recipe Library",
      path: "/recipe-library",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  return (
    <footer className="bg-[#3A3A3A] pt-5 lg:pt-10 xl:pt-20">
      {/* top section */}
      <section className="container text-white w-full pb-10">
        <div className="flex flex-col gap-5 xl:flex-row justify-between lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="space-y-3">
            <figure className="w-[110px] h-[85px]">
              <img
                className="w-full h-full object-cover"
                src={`${import.meta.env.VITE_SITE_URL}/${footerInfo?.logo}`}
                alt="logo" />
            </figure>
            <div className="max-w-[330px]">
              {typeof footerInfo?.description === 'string' && parse(footerInfo.description)}
            </div>
          </div>

          <div className="">
            <h5 className="text-lg lg:font-medium">Explore</h5>
            <ul className="md:space-y-3 space-y-2 md:mt-4 mt-2">
              {exploreData?.map((item) => (
                <li key={item?.title}>
                  <Link to={item?.path}>{item?.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-lg  lg:font-medium">
              Recipe library
            </h5>
            <ul className="md:space-y-3 space-y-2 md:mt-4 mt-2">
              {recipeLibrary?.map((item) => (
                <li key={item?.id}>
                  <Link to={`/recipes/recipe_library/${item?.id}`}>{item?.diet_name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-medium">Contact here</h5>

            {/* links */}
            <ul className="mt-4 flex items-center gap-4">
              {socialInfo?.map((item, idx) => (
                <li key={idx}>
                  <a target="_blank" href={item?.profile_link}>
                    {
                      item?.social_media === 'facebook' && <FacebookSvg />
                    }
                    {
                      item?.social_media === 'twitter' && <TwitterSvg />
                    }
                    {
                      item?.social_media === 'instagram' && <InstagramSvg />
                    }
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* bottom section */}
      <section>
        <p className="text-[#D0D0D0] text-center py-5 border-t border-primary">
          {footerInfo?.copyright_text}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
