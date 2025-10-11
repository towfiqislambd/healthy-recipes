import {
  getRecipeLibraryData,
  getSiteSettings,
  getSocialLinks,
} from "@/Hooks/api/cms_api";
import {
  FacebookSvg,
  InstagramSvg,
  TwitterSvg,
} from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import Image from "next/image";
import Container from "@/Components/Common/Container";

type libraryItem = {
  id: number;
  diet_name: string;
};

type socialItem = {
  social_media: string;
  profile_link: string;
};

const Footer = async () => {
  const footerInfo = await getSiteSettings();
  const recipeLibrary = await getRecipeLibraryData();
  const socialInfo = await getSocialLinks();
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
      <Container>
        <div className="text-white w-full pb-10 flex flex-col gap-5 xl:flex-row justify-between lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="space-y-3">
            <figure className="w-[110px] h-[85px] relative">
              <Image
                className="w-full h-full object-cover"
                fill
                alt="logo"
                src={`${process.env.NEXT_PUBLIC_SITE_URL}/${footerInfo?.data?.logo}`}
              />
            </figure>

            <div
              dangerouslySetInnerHTML={{
                __html: footerInfo?.data?.description,
              }}
              className="max-w-[330px]"
            />
          </div>

          <div>
            <h5 className="text-lg lg:font-medium">Explore</h5>

            <ul className="md:space-y-3 space-y-2 md:mt-4 mt-2">
              {exploreData?.map(item => (
                <li key={item?.title}>
                  <Link href={item?.path}>{item?.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-lg  lg:font-medium">Recipe library</h5>

            <ul className="md:space-y-3 space-y-2 md:mt-4 mt-2">
              {recipeLibrary?.data?.map((item: libraryItem) => (
                <li key={item?.id}>
                  <Link href={`/recipes/recipe_library/${item?.id}`}>
                    {item?.diet_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-medium">Contact here</h5>

            {/* Social links */}
            <ul className="mt-4 flex items-center gap-4">
              {socialInfo?.data?.map((item: socialItem, idx: number) => (
                <li key={idx}>
                  <a target="_blank" href={item?.profile_link}>
                    {item?.social_media === "facebook" && <FacebookSvg />}
                    {item?.social_media === "twitter" && <TwitterSvg />}
                    {item?.social_media === "instagram" && <InstagramSvg />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Copyright Section */}
      <p className="text-[#D0D0D0] text-center py-5 border-t border-primary-orange">
        <Container>{footerInfo?.copyright_text}</Container>
      </p>
    </footer>
  );
};

export default Footer;
