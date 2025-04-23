import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { RiResetLeftFill } from 'react-icons/ri';
import RecipeCard from '../cards/RecipeCard';
import { useAllCategories, useAllRecipes, useAllRecipesPrivate, useRecipeLibrary } from '@/hooks/cms.queries';
import useAuth from '@/hooks/useAuth';
import { Loader } from '../loader/Loader';

const MealPlannerTabSection = () => {
  const { user, search } = useAuth();
  const [activeTab, setActiveTab] = useState({ id: 0, category_name: 'All Recipes' });
  const [ageGroup, setAgeGroup] = useState(null);
  const [library, setLibrary] = useState(null);
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const { data: allCategories, isLoading: isAllCategoryLoading } = useAllCategories();
  const { data: recipeLibrary, isLoading: isRecipeLibraryLoading } = useRecipeLibrary()
  const { data: allRecipes, isLoading: loadingAllRecipe } = useAllRecipes(activeTab?.id, library, ageGroup, null, search);
  const { data: recipesPrivate, refetch, isLoading: privateRecipesLoading } = useAllRecipesPrivate(activeTab?.id, library, ageGroup, null, search);

  const isLoading =
    isAllCategoryLoading ||
    isRecipeLibraryLoading ||
    loadingAllRecipe

  if (isLoading) {
    return <div className="flex justify-center items-center h-[50vh]"><Loader /></div>;
  }

  let recipeData = null;
  if (user) {
    recipeData = recipesPrivate;
  }
  else {
    recipeData = allRecipes;
  }

  const filterClass = `text-base py-2 lg:py-3 px-3 lg:px-4 focus:bg-primary font-poppins text-textColor focus:text-white cursor-pointer`;

  // const getCountByType = (type) => {
  //   if (type === 'All Recipes') {
  //     return recipeData?.length || 0;
  //   } else {
  //     return recipeData?.filter((recipe) => recipe?.category_name === type)?.length || 0;
  //   }
  // };

  const handleReset = () => {
    setSelectedAge('');
    setSelectedDiet('');
    setAgeGroup(null);
    setLibrary(null);
    setActiveTab({ category_name: 'All Recipes' });
  };

  return (
    <section className="py-5 3xl:py-12 container">
      <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">

        {/* Tabs */}
        <div className="py-8 w-full flex flex-wrap items-center justify-center 2xl:justify-between gap-x-1 gap-y-2">
          <button
            onClick={() => setActiveTab({ category_name: 'All Recipes' })}
            className={`px-4 2xl:px-6 2xl:py-3 py-2 rounded-full font-medium ${activeTab?.category_name === 'All Recipes'
              ? 'bg-[#3A3A3A] text-white'
              : 'bg-transparent text-textColor'
              }`}
          >
            All Recipes
            {/* <span>({getCountByType('All Recipes')})</span> */}
          </button>

          {allCategories?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`px-4 2xl:px-6 2xl:py-3 py-2 rounded-full font-medium ${tab?.category_name === activeTab?.category_name
                ? 'bg-[#3A3A3A] text-white'
                : 'bg-transparent text-textColor'
                }`}
            >
              {tab?.category_name}
              {/* <span>({getCountByType(tab?.category_name)})</span> */}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="my-2 w-full md:w-[400px] lg:w-auto mx-auto border lg:border-none p-5 rounded-lg lg:p-0 3xl:py-12 flex flex-col lg:flex-row items-center justify-center gap-3 2xl:gap-5">
          <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-3 lg:gap-0">
            {/* Age Filter */}
            <Select value={selectedAge} onValueChange={(age) => setAgeGroup(age)}>
              <SelectTrigger className="w-full lg:w-[280px] xl:w-[300px] 2xl:w-[460px] h-11 2xl:h-14 lg:rounded-l-full lg:px-6 px-3 text-base focus:ring-primary">
                <SelectValue placeholder="Filter by age group" />
              </SelectTrigger>
              <SelectContent className="px-0 py-0">
                <SelectItem value="teen" className={filterClass}>Teen (13–19 years)</SelectItem>
                <SelectItem value="adult" className={filterClass}>Adult (20–39 years)</SelectItem>
                <SelectItem value="middle-adulthood" className={filterClass}>Middle adulthood (40–59 years)</SelectItem>
                <SelectItem value="senior-adult" className={filterClass}>Senior Adult (60+)</SelectItem>
              </SelectContent>
            </Select>

            {/* Diet Filter */}
            <Select value={selectedDiet} onValueChange={(lib) => setLibrary(lib)}>
              <SelectTrigger className="w-full lg:w-[280px] xl:w-[300px] 2xl:w-[450px] 2xl:h-14 h-11 lg:rounded-r-full lg:border-l-0 px-3 lg:px-6 text-base focus:ring-primary">
                <SelectValue placeholder="Filter by diet" />
              </SelectTrigger>
              <SelectContent className="px-0 py-0">
                {recipeLibrary?.map((library) => (
                  <SelectItem key={library.id} value={library.id} className={filterClass}>
                    {library?.diet_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="h-11 2xl:h-14 w-full lg:w-auto px-3 justify-center lg:px-6 border border-primary rounded-full flex items-center gap-2 bg-primary text-white transition-all duration-300 hover:bg-transparent hover:text-primary"
          >
            <RiResetLeftFill />
            Reset
          </button>
        </div>

        {/* Recipe Cards */}
        <div className="mt-10 grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6">
          {
            privateRecipesLoading ?
              Array.from({ length: 4 }).map((_, idx) => (
                <RecipeCard idx={idx} loading={true} />
              ))
              :
              recipeData?.length > 0 ?
                recipeData?.map((item, idx) => (
                  <RecipeCard
                    refetch={refetch}
                    key={idx}
                    isMyRecipe={true}
                    isPlanner={true}
                    item={item}
                    loading={false}
                  />
                ))
                :
                'No data found'
          }
        </div>
      </div>
    </section>
  );
};

export default MealPlannerTabSection;
