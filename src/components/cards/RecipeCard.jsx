import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";

import {
  FireSvg,
  LoveSvg,
  RecipeBookSvg,
  StarSvg,
} from '../svg-container/SvgContainer';
import { useState } from 'react';

const RecipeCard = ({ item, isPlanner, isMyRecipe, setOpen, handleAddMealFunc }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle Add to planner button click
  const handleAddToPlanner = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
    handleAddMealFunc(item)
  };

  // Function to handle wishlist button click
  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Prevents the click event from bubbling up
    e.preventDefault(); // Prevents the default link navigation
    setIsFavorite((prev) => !prev); // Toggle favorite state
  };

  return (
    <Link
      to={`/recipe-details/${item.id}`}
      className={`bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] pb-5 flex flex-col justify-between group rounded-2xl`}
    >
      <div className="relative">
        {/* image and overlay */}
        <div className="block">
          <div className="sm:h-[350px] h-[250px] w-full relative rounded-sm overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
              src={item?.image}
              alt=""
            />
            {/* Overlay with Linear Gradient */}
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
          </div>
        </div>
        {
          isMyRecipe ?
            <button
              onClick={handleWishlistClick}
              className={`absolute size-10 z-20 flex items-center justify-center top-4 right-4 border border-[#CB4242] rounded-full cursor-pointer ${isFavorite ? 'bg-[#CB4242]' : 'bg-[#FFE3E3]'
                }`}
            >
              <LoveSvg isFavorite={isFavorite} />
            </button>
            :
            <Link
              to={`/dashboard/edit-recipe/${item.id}`}
              onClick={e => e.stopPropagation()}
              className={`absolute size-10 z-20 flex items-center justify-center top-4 right-4 border border-[#CB4242] rounded-full cursor-pointer ${isFavorite ? 'bg-[#CB4242]' : 'bg-[#FFE3E3]'
                }`}
            >
              <FiEdit className='text-lg' />
            </Link>
        }

        {/* type */}
        <div className="absolute top-3 left-3">
          <p className="px-3 py-1.5 rounded-sm bg-white/50 text-black text-sm">
            <span>
              {item?.diet} | {item?.type}
            </span>
          </p>
        </div>
      </div>

      {/* description */}
      <div className="py-4 px-3 text-wrap border-b border-dashed border-black">
        <h5 className="text-lg lg:text-xl font-bold font-merriweather text-black truncate">
          {item?.title}
        </h5>
        <div className="mt-2 xl:mt-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            <div className="flex-shrink-0">
              <RecipeBookSvg />
            </div>
            <p className="text-textColor text-[15px] xl:text-base font-medium">
              {item?.servings} servings | {item?.duration} needed
            </p>
          </div>
          <div>
            <p className="text-textColor font-medium text-[15px] xl:text-base">
              For: <span className="capitalize"> {item?.for}</span>
            </p>
          </div>
          <div>
            <p className="text-textColor font-medium text-[15px] xl:text-base">
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

      {/* add meal button */}
      {
        isPlanner && (
          <div className="px-5">
            <button
              onClick={(e) => handleAddToPlanner(e, item)}
              className="hover:bg-primary border border-primary px-3 lg:px-5 py-2 lg:py-3 rounded-lg hover:text-white text-[#5A5C5F] duration-300 transition-all"
            >
              + Add to planner
            </button>
          </div>
        )
      }
    </Link >
  );
};

export default RecipeCard;
