import { Link, useNavigate } from "react-router-dom";
import {
  FireSvg,
  LoveSvg,
  RecipeBookSvg,
  StarSvg,
} from "../svg-container/SvgContainer";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useAddWishlist } from "@/hooks/cms.mutations";
import { useState } from "react";
import Modal from "../modals/Modal";
import AddMealModal from "../modals/AddMealModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecipeCard = ({ item, refetch, isPlanner, loading }) => {
  const [recipeId, setRecipeId] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: wishlistMutation } = useAddWishlist(item?.id);

  // Function to handle Add to planner button click
  const handleAddToPlanner = (e, item) => {
    e.stopPropagation();
    e.preventDefault();

    if (user) {
      setOpen(true);
      setRecipeId(item?.id);
    } else {
      toast.error("Please login first");
      navigate("/auth/login");
    }
  };

  // Function to handle wishlist button click
  const handleWishlistClick = async e => {
    e.stopPropagation(); // Prevents the click event from bubbling up
    e.preventDefault(); // Prevents the default link navigation

    if (user) {
      await wishlistMutation();
      refetch();
    } else {
      toast.error("Please login first");
      navigate("/auth/login");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-3 space-y-3">
        <Skeleton height={200} />
        <Skeleton height={24} width="80%" />
        <Skeleton count={2} />
        <Skeleton width="60%" />
        <div className="flex justify-between pt-2">
          <Skeleton width={60} height={20} />
          <Skeleton width={60} height={20} />
        </div>
      </div>
    );
  }

  return (
    <>
      <Link
        to={`/recipe-details/${item.id}`}
        className={`bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] pb-1 4xl:pb-5 flex flex-col justify-between group rounded-2xl`}
      >
        <div className="relative">
          {/* image and overlay */}
          <div className="block">
            <div className="h-[300px] lg:h-[320px] 2xl:h-[350px] w-full relative rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
                src={`${import.meta.env.VITE_SITE_URL}/${item?.recipe_image}`}
                alt=""
              />
              {/* Overlay with Linear Gradient */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
            </div>
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className={`absolute size-9 4xl:size-10 z-20 flex items-center justify-center top-3 4xl:top-4 right-3 4xl:right-4 border border-[#CB4242] rounded-full cursor-pointer ${
              item?.is_wishlisted ? "bg-[#CB4242]" : "bg-[#FFE3E3]"
            }`}
          >
            <LoveSvg isFavorite={item?.is_wishlisted} />
          </button>

          {/* type */}
          <div className="absolute top-3 left-3">
            <p className="px-2 4xl:px-3 py-1 4xl:py-1.5 rounded-sm bg-white/50 text-black text-sm truncate">
              <span>
                {`${item?.library_name || item?.recipe_library?.diet_name}
                   | 
                   ${item?.category_name || item?.category?.category_name}`}
              </span>
            </p>
          </div>
        </div>

        {/* description */}
        <div className="py-3 4xl:py-4 px-3 text-wrap border-b border-dashed border-black">
          <h5 className="text-lg 4xl:text-xl font-bold font-merriweather text-black truncate">
            {item?.recipe_name}
          </h5>
          <div className="mt-2 4xl:mt-4 space-y-1 4xl:space-y-2">
            <div className="flex flex-wrap gap-2 truncate">
              <div className="flex-shrink-0">
                <RecipeBookSvg />
              </div>
              <p className="text-textColor text-[15px] xl:text-base font-medium">
                {item?.serving_number} servings | {item?.preparation_time} min
                needed
              </p>
            </div>
            <div>
              <p className="text-textColor font-medium text-[15px] xl:text-base">
                For: <span className="capitalize"> {item?.age_group}</span>
              </p>
            </div>
            <div>
              <p className="text-textColor font-medium text-[15px] xl:text-base truncate">
                {`${item?.total_ingredients} ingredients | ${item?.recipe_creator}`}
              </p>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="px-5 py-3 4xl:py-5 w-full flex items-center justify-between">
          {/* views */}
          <div className="flex items-center gap-1">
            <FireSvg />
            <span className="text-textColor text-sm font-medium">
              {item?.views}
            </span>
          </div>

          {/* reviews */}
          <div className="flex items-center gap-1">
            <StarSvg />
            <span className="text-textColor text-sm font-medium">
              {item?.average_rating || item?.reviews_avg}
            </span>
          </div>
        </div>

        {/* add meal button */}
        {isPlanner && (
          <div className="px-5">
            <button
              onClick={e => handleAddToPlanner(e, item)}
              className="hover:bg-primary border border-primary px-3 2xl:px-5 py-2 2xl:py-3 rounded-lg hover:text-white text-[#5A5C5F] duration-300 transition-all"
            >
              + Add to planner
            </button>
          </div>
        )}
      </Link>
      {/* Modal */}
      <Modal open={open} setOpen={setOpen}>
        <AddMealModal open={open} setOpen={setOpen} recipeId={recipeId} />
      </Modal>
    </>
  );
};

export default RecipeCard;
