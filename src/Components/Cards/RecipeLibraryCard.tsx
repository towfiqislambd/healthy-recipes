import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RecipeBookSvg } from "@/Components/Svg/SvgContainer";

type recipeLibraryItem = {
  id: number;
  image: string;
  diet_name: string;
  recipes_count: number;
};

type RecipeLibraryCardProps = {
  item: recipeLibraryItem;
};

const RecipeLibraryCard = ({ item }: RecipeLibraryCardProps) => {
  return (
    <Link
      href={`/recipes/recipe_library/${item?.id}`}
      className={`w-full bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] block group rounded-lg `}
    >
      {/* Recipe Library Image */}
      <div className="h-[250px] lg:h-[300px] w-full rounded-sm overflow-hidden relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.image}`}
          className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
          fill
          alt="recipe library"
        />

        {/* Primary-black Overlay */}
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-primary-black/30 to-primary-black/30" />
      </div>

      <div className="py-4 px-4 ">
        <h5 className="text-lg 3xl:text-xl font-bold font-merriweather text-primary-black truncate">
          {item?.diet_name}
        </h5>

        <div className="flex gap-3 mt-2 3xl:mt-4">
          <RecipeBookSvg />
          <p className="text-accent-gray font-medium">
            {item?.recipes_count} | Multiple authors
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeLibraryCard;
