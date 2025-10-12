"use client";
import { RotatingLines } from "react-loader-spinner";

export function Spinner() {
  return (
    <RotatingLines
      visible={true}
      height={60}
      width={60}
      color="grey"
      strokeWidth="5"
      strokeColor="orange"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export const RecipeCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 space-y-4 animate-pulse">
      <div className="relative">
        <div className="h-[200px] bg-gray-200 rounded-lg" />
      </div>
      <div className="h-6 w-4/5 bg-gray-200 rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/5 bg-gray-200 rounded" />
      </div>

      <div className="flex justify-between items-center">
        <div className="w-10 h-5 rounded bg-gray-200"></div>
        <div className="w-8 h-4 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export const ReviewCardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-2xl px-3 md:px-4 2xl:px-5 3xl:px-7 py-3.5 lg:py-5 w-full animate-pulse">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 3xl:gap-3">
          <div className="size-10 lg:size-12 2xl:size-16 bg-gray-200 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-24 md:w-32" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-200 rounded-sm" />
          ))}
        </div>
      </div>
      <div className="mt-3 3xl:mt-5 space-y-2">
        <div className="h-3.5 bg-gray-200 rounded w-full" />
        <div className="h-3.5 bg-gray-200 rounded w-11/12" />
      </div>
    </div>
  );
};
