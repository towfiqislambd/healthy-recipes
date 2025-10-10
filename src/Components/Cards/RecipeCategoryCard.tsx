import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RecipeBookSvg } from "@/Components/Svg/SvgContainer";

type libraryItem = {
  id: number;
  diet_name: string;
  image: string;
  status: string;
  recipes_count: number;
};

interface LibraryProps {
  item: libraryItem;
}

const RecipeCategoryCard = ({ item }: LibraryProps) => {
  return (
    <Link
      href={`/recipe-library/${item?.id}`}
      className="w-full bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] block group rounded-2xl"
    >
      {/* Recipe Library Image */}
      <div className="h-[250px] lg:h-[300px] w-full relative rounded-sm overflow-hidden">
        <Image
          fill
          className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.image}`}
          alt="library image"
        />
        {/* Overlay with Linear Gradient */}
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-primary-black/30 to-primary-black/30" />
      </div>

      <div className="py-4 px-4 ">
        {/* Recipe Library Name */}
        <h5 className="text-lg 3xl:text-xl font-bold font-merriweather text-primary-black truncate">
          {item?.diet_name}
        </h5>

        {/* Recipe Library Author */}
        <div className="flex gap-3 mt-2 3xl:mt-4 space-y-2">
          <RecipeBookSvg />
          <p className="text-accent-gray font-medium">
            {item?.recipes_count} | Multiple authors
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCategoryCard;
