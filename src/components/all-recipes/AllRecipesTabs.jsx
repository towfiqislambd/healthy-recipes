import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import RecipeCard from '../cards/RecipeCard';
import { allRecipes } from '@/data/data';

const AllRecipesTabs = () => {
  const allTabs = [
    {
      title: 'All recipes',
    },
    {
      title: 'Breakfast',
    },
    {
      title: 'Dinner',
    },
    {
      title: 'Appetizer',
    },
    {
      title: 'Beverages',
    },
    {
      title: 'Salad',
    },
    {
      title: 'Desserts',
    },
    {
      title: 'Snacks',
    },
  ];
  const [activeTab, setActiveTab] = useState(allTabs[0]);
  const filterClass = `text-base py-3 px-4 focus:bg-primary font-poppins text-textColor focus:text-white cursor-pointer`;

  //functions:
  const getCountByType = (type) => {
    if (type === 'All recipes') {
      return allRecipes?.length;
    } else {
      return allRecipes?.filter((recipe) => recipe.type === type)?.length;
    }
  };

  const filteredRecipes =
    activeTab?.title == 'All recipes'
      ? allRecipes
      : allRecipes?.filter((recipe) => recipe.type === activeTab?.title);

  return (
    <div className="container pb-20">
      {/* tabs */}
      <div className="py-8 w-full flex items-center justify-between">
        {allTabs?.map((tab) => (
          <button
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full  font-medium
          ${
            tab?.title === activeTab?.title
              ? 'bg-[#3A3A3A] text-white'
              : 'bg-transparent text-textColor'
          }
          `}
          >
            {tab?.title}
            <span>({getCountByType(tab?.title)})</span>
          </button>
        ))}
      </div>

      {/* filter */}
      <div className="w-full flex items-center justify-end">
        <Select>
          <SelectTrigger className="w-[460px] h-14 rounded-full px-6 text-base focus:ring-primary">
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
      </div>

      {/* cards */}
      <div className="mt-10 grid grid-cols-4 gap-6">
        {filteredRecipes?.map((item, idx) => (
          <RecipeCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllRecipesTabs;
