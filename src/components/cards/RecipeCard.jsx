import { Link } from "react-router-dom";
import {
  FireSvg,
  LoveSvg,
  RecipeBookSvg,
  StarSvg,
} from "../svg-container/SvgContainer";
import { useState } from "react";

const RecipeCard = ({ item, down }) => {

  console.log(item);
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle wishlist button click
  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Prevents the click event from bubbling up
    e.preventDefault(); // Prevents the default link navigation
    setIsFavorite((prev) => !prev); // Toggle favorite state
  };

  return (
    <Link
      to={`/recipe-details/${item.id}`}
      className={`bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] block group rounded-2xl ${
        down ? "my-5" : "my-0"
      }`}
    >
      <div className="relative">
        {/* image and overlay */}
        <div className="block">
          <div className="sm:h-[370px] h-[250px] w-full relative rounded-sm overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
              src={item?.image}
              alt=""
            />
            {/* Overlay with Linear Gradient */}
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
          </div>
        </div>

        {/* wish icon */}
        <button
          onClick={handleWishlistClick}
          className={`absolute size-10 z-20 flex items-center justify-center top-4 right-4 border border-[#CB4242] rounded-full cursor-pointer ${
            isFavorite ? "bg-[#CB4242]" : "bg-[#FFE3E3]"
          }`}
        >
          <LoveSvg isFavorite={isFavorite} />
        </button>

        {/* type */}
        <div className="absolute top-3 left-3">
          <p className="px-3 py-1.5 rounded-sm bg-white/50 text-black text-sm">
            {item?.type}
          </p>
        </div>
      </div>

      {/* description */}
      <div className="py-4 px-3 text-wrap border-b border-dashed border-black">
        <h5 className="text-xl font-bold font-merriweather text-black">
          {item?.title}
        </h5>
        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            <div className="flex-shrink-0">
              <RecipeBookSvg />
            </div>
            <p className="text-textColor text-sm 2xl:text-base font-medium text-nowrap">
              {item?.servings} servings | {item?.duration} needed |
              {item?.allergens}
            </p>
          </div>
          <div>
            <p className="text-textColor font-medium">
              {item?.ingredients} ingredients | {item?.author}
            </p>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="px-5 py-5 w-full flex items-center justify-between">
        {/* views */}
        <div className="flex items-center gap-1">
          <FireSvg />
          <span className="text-textColor text-sm font-medium">5720 views</span>
        </div>

        {/* reviews */}
        <div className="flex items-center gap-1">
          <StarSvg />
          <span className="text-textColor text-sm font-medium">4.8/5</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
