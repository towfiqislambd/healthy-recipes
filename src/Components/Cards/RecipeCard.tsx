"use client";
import {
  FireSvg,
  LoveSvg,
  RecipeBookSvg,
  StarSvg,
} from "@/Components/Svg/SvgContainer";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuLoaderPinwheel } from "react-icons/lu";
import Link from "next/link";
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/Hooks/api/cms_api";
import Modal from "../Common/Modal";

const RecipeCard = ({ item, isPlanner }: any) => {
  const { user } = useAuth();
  const router = useRouter();
  const [recipeId, setRecipeId] = useState(null);
  const [open, setOpen] = useState<boolean>(false);
  const { mutate: wishlistMutation, isPending } = useWishlist(item?.id);

  // Function to handle Add to planner button click
  const handleAddToPlanner = (e: any, item: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (user) {
      setOpen(true);
      setRecipeId(item?.id);
    } else {
      toast.error("Please login first");
      router.push("/auth/login");
    }
  };

  // Function to handle wishlist button click
  const handleWishlistClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (user) {
      wishlistMutation();
    } else {
      toast.error("Please login first");
      router.push("/auth/login");
    }
  };

  return (
    <>
      <Link
        href={`/recipe-details/${item.id}`}
        className={`bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] pb-1 4xl:pb-5 flex flex-col justify-between group rounded-2xl`}
      >
        <div className="relative">
          {/* image and overlay */}
          <div className="block">
            <div className="h-[300px] lg:h-[320px] 3xl:h-[350px] w-full relative rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
                src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.recipe_image}`}
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
            {isPending ? (
              <LuLoaderPinwheel className="animate-spin text-red-400 size-6" />
            ) : (
              <LoveSvg isFavorite={item?.is_wishlisted} />
            )}
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
        <div className="py-4 px-3 text-wrap border-b border-dashed border-black">
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
          <div className="px-5 mb-3">
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
      <Modal open={open} onClose={() => setOpen(false)}>
        {/* <AddMealModal open={open} setOpen={setOpen} recipeId={recipeId} /> */}
        Modal
      </Modal>
    </>
  );
};

export default RecipeCard;
