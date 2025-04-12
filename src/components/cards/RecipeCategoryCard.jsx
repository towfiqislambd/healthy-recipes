import { Link, useParams } from "react-router-dom";
import { RecipeBookSvg } from "../svg-container/SvgContainer";

const RecipeCategoryCard = ({ item }) => {

  const { id } = useParams();
  console.log(id);



  return (
    <Link
      onClick={() => {
        console.log(item.id);

      }}
      to={`/recipes/recipe_library_id/${item?.id}`}
      className={`w-full bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] block group rounded-2xl `}
    >
      {/* image */}
      <div className="h-[200px] lg:h-[300px] w-full relative rounded-sm overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
          src={`${import.meta.env.VITE_SITE_URL}/${item?.image}`}
          alt=""
        />
        {/* Overlay with Linear Gradient */}
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
      </div>

      {/* description */}
      <div className="py-4 px-4 ">
        <h5 className="text-lg 3xl:text-xl font-bold font-merriweather text-black truncate">
          {item?.diet_name}
        </h5>
        <div className="mt-2 3xl:mt-4 space-y-2">
          <div className="flex gap-3">
            <RecipeBookSvg />
            <p className="text-textColor font-medium">
              12 recipes | Multiple authors
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCategoryCard;
