"use client";
import RecipeCard from "@/Components/Cards/RecipeCard";
import { getMyRecipes, getWishlist } from "@/Hooks/api/cms_api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import deleteImg from "@/Assets/images/delete.png";

const page = () => {
  const { data: savedRecipes, isLoading: isLoadingSavedRecipes } =
    getWishlist();
  const { data: myRecipes, isLoading: isLoadingMyRecipes } = getMyRecipes();

  return (
    <section className="p-4 sm:p-5">
      <h3 className="mb-2 sm:mb-3 3xl:mb-5 text-[22px] sm:text-2xl 3xl:text-3xl 4xl:text-4xl text-[#E48E19] font-semibold font-merriweather">
        Dashboard
      </h3>

      {/* Share recipes */}
      <div className="mb-8 sm:mb-10">
        <div className="flex mb-4 sm:mb-6 justify-between items-center">
          <h3 className="font-merriweather font-semibold text-[#141414] text-lg sm:text-xl">
            Your shared recipes
          </h3>
          <button>
            <Link
              href="/dashboard/my-recipes"
              className="text-primary font-poppins font-medium text-sm sm:text-base"
            >
              View all
            </Link>
          </button>
        </div>
        <div className="grid md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-5">
          {myRecipes?.data?.recipes?.data?.length > 0 ? (
            myRecipes?.data?.recipes?.data
              ?.slice(0, 4)
              ?.map((item: any, idx: any) => (
                <RecipeCard key={idx} item={item} />
              ))
          ) : (
            <div className="text-center col-span-4 py-6 space-y-3">
              <Image src={deleteImg} alt="logo" className="mx-auto size-16" />
              <p className="text-primary font-merriweather md:text-lg lg:text-xl">
                No shared recipes found yet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Favorite Recipes */}
      <div className="mb-8 sm:mb-10">
        <div className="flex mb-4 sm:mb-6 justify-between items-center">
          <h3 className="font-merriweather font-semibold text-[#141414] text-lg sm:text-xl">
            Your favorite recipes
          </h3>
          <button>
            <Link
              href="/dashboard/saved-recipes"
              className="text-primary text-sm sm:text-base font-poppins font-medium"
            >
              View all
            </Link>
          </button>
        </div>
        <div className="grid md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-5">
          {savedRecipes?.data?.wishlist?.data?.length > 0 ? (
            savedRecipes?.data?.wishlist?.data
              ?.slice(0, 4)
              ?.map((item: any, idx: number) => (
                <RecipeCard key={idx} item={item} />
              ))
          ) : (
            <div className="text-center col-span-4 py-6 space-y-3">
              <Image src={deleteImg} alt="logo" className="mx-auto size-16" />
              <p className="text-primary font-merriweather md:text-lg lg:text-xl">
                No favorite recipes found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
