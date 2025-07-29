import { useState } from "react";
import { useAllCategories, useMyRecipes } from "@/hooks/cms.queries";
import MyRecipeCard from "@/pages/dashboard/MyRecipeCard";
import { Loader } from "@/components/loader/Loader";
import deleteImg from "@/assets/images/delete.png";

const DashboardSavedRecipes = () => {
  const [activeTab, setActiveTab] = useState({
    id: 0,
    category_name: "All Recipes",
  });
  const [activePage, setActivePage] = useState(1);
  const { data: allCategories, isLoading: categoryLoading } =
    useAllCategories();
  const { data: myRecipes, isLoading: myRecipeLoading } = useMyRecipes(
    activePage,
    activeTab?.id
  );

  if (categoryLoading) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Loader />
      </div>
    );
  }

  return (
    <section className="3xl:p-5">
      <h3 className="3xl:mb-7 text-xl 2xl:text-2xl text-[#E48E19] font-semibold font-merriweather">
        Your shared recipes
      </h3>

      {/* Tabs */}
      <div className="py-5 2xl:py-8 w-full flex flex-wrap items-center justify-center 2xl:justify-between gap-x-1 gap-y-2">
        <button
          onClick={() => setActiveTab({ id: 0, category_name: "All Recipes" })}
          className={`px-3 sm:px-4 3xl:px-6 py-[5px] text-[15px] sm:text-base sm:py-2 3xl:py-3 rounded-full font-medium ${
            activeTab?.category_name === "All Recipes"
              ? "bg-[#3A3A3A] text-white"
              : "bg-transparent text-textColor"
          }`}
        >
          All Recipes
        </button>

        {allCategories?.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 3xl:px-6 py-[5px] text-[15px] sm:text-base sm:py-2 3xl:py-3 rounded-full font-medium ${
              tab?.category_name === activeTab?.category_name
                ? "bg-[#3A3A3A] text-white"
                : "bg-transparent text-textColor"
            }`}
          >
            {tab?.category_name}
          </button>
        ))}
      </div>

      {/* cards */}
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-5 3xl:px-5 2xl:px-0">
        {myRecipeLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <MyRecipeCard key={idx} idx={idx} loading={true} />
          ))
        ) : myRecipes?.recipes?.data?.length > 0 ? (
          myRecipes?.recipes?.data?.map((item, idx) => (
            <MyRecipeCard isSavedRecipe={true} key={idx} item={item} />
          ))
        ) : (
          <div className="text-center col-span-4 py-6 space-y-3">
            <img src={deleteImg} alt="logo" className="mx-auto size-16" />
            <p className="text-primary font-merriweather md:text-lg">
              No shared recipes found
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
        {myRecipes?.recipes?.links.map((item, idx) => (
          <button
            key={idx}
            onClick={() => item.url && setActivePage(item.url.split("=")[1])}
            className={`px-3 py-1 rounded border transition-all duration-150 
        ${item.active ? "bg-primary text-white" : "bg-white text-gray-700"} 
        ${!item.url ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            disabled={!item.url}
            dangerouslySetInnerHTML={{ __html: item.label }}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardSavedRecipes;
