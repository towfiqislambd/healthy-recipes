export const RecipeCardSkeleton = () => {
  return (
    <div className="bg-gray-200 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] pb-1 4xl:pb-5 flex flex-col justify-between group rounded-2xl animate-pulse">
      <div className="relative">
        <div className="h-[300px] lg:h-[320px] 3xl:h-[350px] w-full bg-gray-200 rounded-sm overflow-hidden" />
        <div className="absolute size-9 4xl:size-10 top-3 right-3 bg-gray-300 rounded-full" />
        <div className="absolute top-3 left-3 bg-gray-300 h-5 w-40 rounded-sm" />
      </div>

      <div className="py-4 px-3 border-b border-dashed border-gray-300">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-3" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>

      <div className="px-5 py-3 4xl:py-5 w-full flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-10" />
        <div className="h-4 bg-gray-200 rounded w-10" />
      </div>

      <div className="px-5 mb-3">
        <div className="h-10 bg-gray-200 rounded-lg w-full" />
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
