import { Link } from 'react-router-dom';
import {
  FireSvg,
  LoveSvg,
  RecipeBookSvg,
  StarSvg,
} from '../svg-container/SvgContainer';
import { useState } from 'react';

const RecipeCard = ({ item, down }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <Link
      className={`bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] block group rounded-2xl ${
        down ? 'my-5' : 'my-0'
      }`}
    >
      {/* image */}
      <div className="h-[370px] w-full relative rounded-sm overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
          src={item?.image}
          alt=""
        />
        {/* Overlay with Linear Gradient */}
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>

        {/* wish icon */}
        <div
          onClick={() => setIsFavorite((prev) => !prev)}
          className={`absolute size-10 flex items-center justify-center top-5 right-5 border border-[#CB4242] rounded-full cursor-pointer ${
            isFavorite ? 'bg-[#CB4242]' : 'bg-[#FFE3E3]'
          }`}
        >
          <LoveSvg isFavorite={isFavorite} />
        </div>
      </div>

      {/* description */}
      <div className="py-4 px-4 border-b border-dashed border-black">
        <h5 className="text-xl font-bold font-merriweather text-black">
          Fish and Vegetable Fry
        </h5>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3">
            <RecipeBookSvg />
            <p className="text-textColor font-medium">
              Recipe | Keto diet collection
            </p>
          </div>
          <div>
            <p className="text-textColor font-medium">
              12 recipes | Multiple authors
            </p>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="px-7 py-5 w-full flex items-center justify-between">
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
