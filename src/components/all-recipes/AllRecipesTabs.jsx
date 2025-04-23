import { useState } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import RecipeCard from "../cards/RecipeCard";
import { useAllRecipes } from "@/hooks/cms.queries";
import { Loader } from "../loader/Loader";

const AllRecipesTabs = ({ data, recipes, libraryId }) => {
  const [activeTab, setActiveTab] = useState({ id: 0, category_name: 'All Recipes' });
  const [tag, setTag] = useState(null);
  const [selectedAllergen, setSelectedAllergen] = useState("");
  const filterClass = `text-base py-2 xl:py-3 px-3 xl:px-4 focus:bg-primary font-poppins text-textColor focus:text-white cursor-pointer`;

  const { data: allRecipes, isLoading } = useAllRecipes(activeTab?.id, libraryId, null, tag);
  if (isLoading) {
    return <div className="h-[50vh] flex justify-center items-center"><Loader /></div>;
  }

  const getCountByType = (type) => {
    if (type === 'All Recipes') {
      return recipes?.length || 0;
    } else {
      return recipes?.filter((recipe) => recipe?.category_name === type)?.length || 0;
    }
  };

  const handleReset = () => {
    setSelectedAllergen("");
    setTag(null);
    setActiveTab({ id: 0, category_name: 'All Recipes' });
  };

  return (
    <div className="container pb-7 xl:pb-10 2xl:pb-20">
      <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">

        {/* Tabs */}
        <div className="py-5 sm:py-8 w-full flex flex-wrap items-center justify-center 3xl:justify-between gap-x-1 gap-y-2">
          <button
            onClick={() => setActiveTab({ id: 0, category_name: 'All Recipes' })}
            className={`px-3 sm:px-4 2xl:px-6 2xl:py-3 py-2 text-sm sm:text-base rounded-full font-medium ${activeTab?.category_name === 'All Recipes'
              ? 'bg-[#3A3A3A] text-white'
              : 'bg-transparent text-textColor'
              }`}
          >
            All Recipes <span>({getCountByType('All Recipes')})</span>
          </button>

          {data?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 2xl:px-6 2xl:py-3 py-2 text-sm sm:text-base rounded-full font-medium ${tab?.category_name === activeTab?.category_name
                ? 'bg-[#3A3A3A] text-white'
                : 'bg-transparent text-textColor'
                }`}
            >
              {tab?.category_name} <span>({getCountByType(tab?.category_name)})</span>
            </button>
          ))}
        </div>

        {/* Filter */}
        <div className="w-full flex flex-wrap items-center justify-center 2xl:justify-end gap-3 xl:gap-3 2xl:gap-5">
          <Select value={selectedAllergen} onValueChange={(tag) => setTag(tag)}>
            <SelectTrigger className="w-[300px] md:w-[380px] 2xl:w-[450px] h-9 sm:h-11 2xl:h-14 rounded-full px-4 2xl:px-6 text-base focus:ring-primary">
              <SelectValue placeholder="Select recipes by tags..." />
            </SelectTrigger>
            <SelectContent className="px-0 py-0">
              {
                recipes?.map(recipe => (
                  recipe.tag_names?.map(tag => <SelectItem key={tag.id} value={tag?.id} className={filterClass}>
                    {tag?.tag_name}
                  </SelectItem>)
                ))
              }
            </SelectContent>
          </Select>

          <button
            onClick={handleReset}
            className="h-9 sm:h-11 2xl:h-14 px-3 2xl:px-6 border border-primary rounded-full flex items-center gap-2 bg-primary text-white transition-all duration-300 hover:bg-transparent hover:text-primary"
          >
            <RiResetLeftFill />
            Reset
          </button>
        </div>

        {/* Cards */}
        <div className="mt-10 grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6">
          {
            allRecipes?.length > 0 ?
              allRecipes?.map((item, idx) => (
                <RecipeCard key={idx} item={item} isMyRecipe={true} />
              ))
              :
              'No data found'
          }
        </div>
      </div>
    </div>
  );
};

export default AllRecipesTabs;
