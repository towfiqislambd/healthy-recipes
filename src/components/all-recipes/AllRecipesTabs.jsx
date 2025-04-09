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
import { allRecipes } from "@/data/data";

const AllRecipesTabs = () => {
  const allTabs = [
    {
      title: "All recipes",
    },
    {
      title: "Breakfast",
    },
    {
      title: "Dinner",
    },
    {
      title: "Appetizer",
    },
    {
      title: "Beverages",
    },
    {
      title: "Salad",
    },
    {
      title: "Desserts",
    },
    {
      title: "Snacks",
    },
  ];
  const [activeTab, setActiveTab] = useState(allTabs[0]);
  const [selectedAllergen, setSelectedAllergen] = useState("");
  const [updatedRecipes, setUpdatedRecipes] = useState(allRecipes);
  const filterClass = `text-base py-3 px-4 focus:bg-primary font-poppins text-textColor focus:text-white cursor-pointer`;

  //functions:
  const getCountByType = (type) => {
    if (type === "All recipes") {
      return updatedRecipes?.length;
    } else {
      return updatedRecipes?.filter((recipe) => recipe.type === type)?.length;
    }
  };
  const handleFilterChange = (allergen) => {
    // Update updatedRecipes based on the selected allergen
    const filteredRecipes = allRecipes.filter(
      (item) => item?.allergens === allergen
    );
    setSelectedAllergen(allergen);
    setUpdatedRecipes(filteredRecipes);
  };

  const handleReset = () => {
    setSelectedAllergen("");
    setActiveTab(allTabs[0]);
    setUpdatedRecipes(allRecipes);
  };

  const filteredRecipes =
    activeTab?.title == "All recipes"
      ? updatedRecipes
      : updatedRecipes?.filter((recipe) => recipe.type === activeTab?.title);

  return (
    <div className="container pb-7 xl:pb-10 2xl:pb-20">
      <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
        {/* tabs */}
        <div className="py-5 xl:py-8 w-full flex flex-wrap items-center justify-center 2xl:justify-between gap-x-1 gap-y-2">
          {allTabs?.map((tab) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(tab)}
              className={`px-4 2xl:px-6 2xl:py-3 py-2 rounded-full  font-medium
          ${tab?.title === activeTab?.title
                  ? "bg-[#3A3A3A] text-white"
                  : "bg-transparent text-textColor"
                }
          `}
            >
              {tab?.title}
              <span>({getCountByType(tab?.title)})</span>
            </button>
          ))}
        </div>

        {/* filter */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center 2xl:justify-end gap-3 xl:gap-3 2xl:gap-5">
          <Select value={selectedAllergen} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[300px] md:w-[380px] 2xl:w-[450px] h-11 2xl:h-14 rounded-full px-3 2xl:px-6 text-base focus:ring-primary">
              <SelectValue placeholder="Select for recipes by allergens..." />
            </SelectTrigger>
            <SelectContent className="px-0 py-0">
              <SelectItem value="Dairy-Free" className={filterClass}>
                Dairy-Free
              </SelectItem>
              <SelectItem value="Gluten-Free" className={filterClass}>
                Gluten-Free
              </SelectItem>
              <SelectItem value="Nut-Free" className={filterClass}>
                Nut-Free
              </SelectItem>
              <SelectItem value="Soy-Free" className={filterClass}>
                Soy-Free
              </SelectItem>
              <SelectItem value="Egg-Free" className={filterClass}>
                Egg-Free
              </SelectItem>
              <SelectItem value="Shellfish-Free" className={filterClass}>
                Shellfish-Free
              </SelectItem>
              <SelectItem value="Fish-Free" className={filterClass}>
                Fish-Free
              </SelectItem>
              <SelectItem value="Sesame-Free" className={filterClass}>
                Sesame-Free
              </SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={handleReset}
            className="h-11 2xl:h-14 px-3 2xl:px-6 border border-primary rounded-full flex items-center gap-2 bg-primary text-white transition-all duration-300 hover:bg-transparent hover:text-primary"
          >
            <RiResetLeftFill />
            Reset
          </button>
        </div>

        {/* cards */}
        <div className="mt-10 grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6">
          {filteredRecipes?.map((item, idx) => (
            <RecipeCard key={idx} item={item} down={idx % 2 !== 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRecipesTabs;
