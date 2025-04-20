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
import Modal from '../modals/Modal';
import AddMealModal from '../modals/AddMealModal';
import { useAllCategories, useAllRecipes, useAllRecipesPrivate, useRecipeLibrary } from '@/hooks/cms.queries';
import useAuth from '@/hooks/useAuth';

const MealPlannerTabSection = ({ recipes }) => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState({ id: 0, category_name: 'All Recipes' });
  const [ageGroup, setAgeGroup] = useState(null);
  const [library, setLibrary] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [plannerItem, setPlannerItem] = useState(null);
  const [tableData, setTableData] = useState([]);
  const { data: allCategories } = useAllCategories();
  const { data: recipeLibrary } = useRecipeLibrary()
  const { data: allRecipes, isLoading: loadingAllRecipe } = useAllRecipes(activeTab?.id, library, ageGroup);
  const { data: recipesPrivate, isLoading: loadingAllRecipePrivate, refetch } = useAllRecipesPrivate(activeTab?.id, library, ageGroup);

  let recipeData = null;
  if (user) {
    recipeData = recipesPrivate;
  }
  else {
    recipeData = allRecipes;
  }

  if (loadingAllRecipe || loadingAllRecipePrivate) return <p>loading....</p>;

  const filterClass = `text-base py-3 px-4 focus:bg-primary font-poppins text-textColor focus:text-white cursor-pointer`;

  const getCountByType = (type) => {
    if (type === 'All Recipes') {
      return recipes?.length || 0;
    } else {
      return recipes?.filter((recipe) => recipe?.category_name === type)?.length || 0;
    }
  };

  const handleReset = () => {
    setSelectedAge('');
    setSelectedDiet('');
    setAgeGroup(null);
    setLibrary(null);
    setActiveTab({ category_name: 'All Recipes' });
  };

  const handleAddMealFunc = (item) => {
    setPlannerItem(item);
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
            All Recipes <span>({getCountByType('All Recipes')})</span>
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
              {tab?.category_name} <span>({getCountByType(tab?.category_name)})</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="my-2 w-full md:w-[400px] lg:w-auto mx-auto border lg:border-none p-5 rounded-lg lg:p-0 3xl:py-12 flex flex-col lg:flex-row items-center justify-center gap-3 2xl:gap-5">
          <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-3 lg:gap-0">
            {/* Age Filter */}
            <Select value={selectedAge} onValueChange={(age) => setAgeGroup(age)}>
              <SelectTrigger className="w-full lg:w-[280px] xl:w-[300px] 2xl:w-[460px] lg:h-14 h-11 lg:rounded-l-full lg:px-6 px-3 text-base focus:ring-primary">
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
              <SelectTrigger className="w-full lg:w-[280px] xl:w-[300px] 2xl:w-[450px] lg:h-14 h-11 lg:rounded-r-full lg:border-l-0 px-3 lg:px-6 text-base focus:ring-primary">
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
            className="h-11 lg:h-14 w-full lg:w-auto px-3 justify-center lg:px-6 border border-primary rounded-full flex items-center gap-2 bg-primary text-white transition-all duration-300 hover:bg-transparent hover:text-primary"
          >
            <RiResetLeftFill />
            Reset
          </button>
        </div>

        {/* Recipe Cards */}
        <div className="mt-10 grid lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
          {recipeData?.map((item, idx) => (
            <RecipeCard
              refetch={refetch}
              key={idx}
              isMyRecipe={true}
              isPlanner={true}
              setOpen={setOpen}
              item={item}
              handleAddMealFunc={handleAddMealFunc}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} setOpen={setOpen}>
        <AddMealModal
          open={open}
          setOpen={setOpen}
          tableData={tableData}
          setTableData={setTableData}
          plannerItem={plannerItem}
        />
      </Modal>
    </section>
  );
};

export default MealPlannerTabSection;
