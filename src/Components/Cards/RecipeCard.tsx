"use client";
import {
  FireSvg,
  LoveSvg,
  RecipeBookSvg,
  StarSvg,
} from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";
import { recipeItem } from "@/Types/type";
import { useRouter } from "next/navigation";
import Modal from "@/Components/Common/Modal";
import { LuLoaderPinwheel } from "react-icons/lu";
import { useWishlist } from "@/Hooks/api/cms_api";
import AddMealModal from "@/Components/Modals/AddMealModal";
import Image from "next/image";

interface recipeProps {
  item: recipeItem;
  isPlanner?: boolean;
}

const RecipeCard = ({ item, isPlanner }: recipeProps) => {
  // Hooks
  const { user } = useAuth();
  const router = useRouter();

  // States
  const [open, setOpen] = useState<boolean>(false);
  const [recipeId, setRecipeId] = useState<number | null>(null);

  // Mutation
  const { mutate: wishlistMutation, isPending } = useWishlist(item?.id);

  // Func for add to planner
  const handleAddToPlanner = (e: React.MouseEvent, item: any) => {
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
        className="bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] flex flex-col justify-between group rounded-lg"
      >
        <div className="relative">
          {/* Recipe Image */}
          <div className="block">
            <div className="h-[300px] lg:h-[320px] w-full relative rounded-sm overflow-hidden">
              <Image
                className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
                src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.recipe_image}`}
                alt="recipe_img"
                fill
              />

              {/* primary-black Overlay  */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-primary-black/30 to-primary-black/30" />
            </div>
          </div>

          {/* Wishlist Btn */}
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

          {/* Type */}
          <div className="absolute top-3 left-3">
            <p className="px-2 4xl:px-3 py-1 4xl:py-1.5 rounded-sm bg-white/50 text-primary-black text-sm truncate">
              {`${item?.library_name || item?.recipe_library?.diet_name}
                   | 
                   ${item?.category_name || item?.category?.category_name}`}
            </p>
          </div>
        </div>

        <div className="py-4 px-3 text-wrap border-b border-dashed border-primary-black">
          <h5 className="text-lg 4xl:text-xl font-bold font-merriweather text-primary-black truncate">
            {item?.recipe_name}
          </h5>

          <div className="mt-2 4xl:mt-3 space-y-1 4xl:space-y-2">
            <div className="flex flex-wrap gap-2 truncate">
              <p className="flex-shrink-0">
                <RecipeBookSvg />
              </p>

              <p className="text-accent-gray text-[15px] xl:text-base font-medium">
                {item?.serving_number} servings | {item?.preparation_time} min
                needed
              </p>
            </div>

            <p className="text-accent-gray font-medium text-[15px] xl:text-base">
              For: <span className="capitalize"> {item?.age_group}</span>
            </p>

            <p className="text-accent-gray font-medium text-[15px] xl:text-base truncate">
              {`${item?.total_ingredients} ingredients | ${item?.recipe_creator}`}
            </p>
          </div>
        </div>

        <div className="px-5 py-3 4xl:py-5 w-full flex items-center justify-between">
          {/* Views */}
          <div className="flex items-center gap-1">
            <FireSvg />
            <span className="text-accent-gray text-sm font-medium">
              {item?.views}
            </span>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-1">
            <StarSvg />
            <span className="text-accent-gray text-sm font-medium">
              {item?.average_rating || item?.reviews_avg}
            </span>
          </div>
        </div>

        {/* Add Meal Btn */}
        {isPlanner && (
          <div className="px-5 mb-3">
            <button
              onClick={e => handleAddToPlanner(e, item)}
              className="hover:bg-primary-orange border border-primary-orange px-4 py-2.5 rounded-[6px] hover:text-white text-[#5A5C5F] duration-300 transition-all cursor-pointer w-fit text-sm"
            >
              + Add to planner
            </button>
          </div>
        )}
      </Link>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddMealModal setOpen={setOpen} recipeId={recipeId} />
      </Modal>
    </>
  );
};

export default RecipeCard;
