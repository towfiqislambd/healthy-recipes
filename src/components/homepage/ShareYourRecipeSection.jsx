import { Link } from "react-router-dom";
import banner from "../../assets/images/share-recipe-bg.png";
import { AddSvgLight, RecipeLogoSvg } from "../svg-container/SvgContainer";

const ShareYourRecipeSection = () => {
  return (
    <section
      className="sm:py-20 py-10 my-10 sm:my-0"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
      }}
    >
      <div className="container w-full flex sm:flex-row flex-col items-center justify-between px-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <RecipeLogoSvg />
          <p className="max-w-[700px] font-inter text-xl sm:text-2xl font-medium leading-[150%] text-white">
            ‘Your Healthy Recipe’ is what you need for you and your family
            members dietary foods, even you can share your healthy foods with
            community or people
          </p>
        </div>

        {/* share recipe button */}
        <Link className="px-6 py-3 rounded-full text-white border border-white relative mt-5 sm:mt-0">
          Share your recipe
          <div className="absolute -top-2.5 left-[6px]">
            <AddSvgLight />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ShareYourRecipeSection;
