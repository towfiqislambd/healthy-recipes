import { Link } from 'react-router-dom';
import { FireSvg, RecipeBookSvg, StarSvg } from '../svg-container/SvgContainer';

const RecipeCategoryCard = ({ item }) => {
  return (
    <Link to='/all-recipes'
      className={`max-w-[370px] bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] block group rounded-2xl `}
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

export default RecipeCategoryCard;
