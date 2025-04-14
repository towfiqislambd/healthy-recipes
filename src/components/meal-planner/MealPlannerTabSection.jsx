import { useState, useEffect } from 'react';
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
import { useAllCategories, useAllRecipes } from '@/hooks/cms.queries';

const MealPlannerTabSection = () => {
  const [activeTab, setActiveTab] = useState({ category_name: 'All Recipes' });
  const { data: allCategories, isLoading: catLoading, isFetching: catFetching, isPending: catPending } = useAllCategories();
  const { data: allRecipes, isLoading: recipeLoading, isFetching: recipeFetching, isPending: recipePending } = useAllRecipes();

  const isLoading = catLoading || catFetching || catPending || recipeLoading || recipeFetching || recipePending;

  const [open, setOpen] = useState(false);
  const [updatedRecipes, setUpdatedRecipes] = useState([]);
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [plannerItem, setPlannerItem] = useState(null);
  const [tableData, setTableData] = useState([]);

  const filterClass = `text-base py-3 px-4 focus:bg-primary font-poppins text-textColor focus:text-white cursor-pointer`;

  useEffect(() => {
    if (allRecipes) {
      setUpdatedRecipes(allRecipes);
    }
  }, [allRecipes]);

  const getCountByType = (type) => {
    if (type === 'All Recipes') return updatedRecipes?.length;
    return updatedRecipes?.filter((recipe) => recipe?.category_name === type)?.length;
  };

  const handleFilterChange = (age) => {
    const filteredRecipes = allRecipes?.filter((item) => item?.age_group === age);
    setSelectedAge(age);
    setSelectedDiet('');
    setUpdatedRecipes(filteredRecipes);
  };

  const handleDietChange = (diet) => {
    const filteredRecipes = allRecipes?.filter((item) => item?.library_name === diet);
    setSelectedDiet(diet);
    setSelectedAge('');
    setUpdatedRecipes(filteredRecipes);
  };

  const handleReset = () => {
    setSelectedAge('');
    setSelectedDiet('');
    setActiveTab({ category_name: 'All Recipes' });
    setUpdatedRecipes(allRecipes);
  };

  const filteredRecipes =
    activeTab?.category_name === 'All Recipes'
      ? updatedRecipes
      : updatedRecipes?.filter((recipe) => recipe.category_name === activeTab.category_name);

  const handleAddMealFunc = (item) => {
    setPlannerItem(item);
  };

  if (isLoading) return <p className="h-svh">loading....</p>;

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
            <Select value={selectedAge} onValueChange={handleFilterChange}>
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
            <Select value={selectedDiet} onValueChange={handleDietChange}>
              <SelectTrigger className="w-full lg:w-[280px] xl:w-[300px] 2xl:w-[450px] lg:h-14 h-11 lg:rounded-r-full lg:border-l-0 px-3 lg:px-6 text-base focus:ring-primary">
                <SelectValue placeholder="Filter by diet" />
              </SelectTrigger>
              <SelectContent className="px-0 py-0">
                {[
                  'Keto Diet Recipe',
                  'Mediterranean Diet Recipe',
                  'Vegan Diet Recipe',
                  'Paleo Diet Recipe',
                  'Low-Carb Diet Recipe',
                  'DASH Diet Recipe',
                  'Carnivore Diet Recipe',
                ].map((diet) => (
                  <SelectItem key={diet.trim()} value={diet.trim()} className={filterClass}>
                    {diet}
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
          {filteredRecipes?.map((item, idx) => (
            <RecipeCard
              key={idx}
              isMyRecipe={true}
              isPlanner={true}
              setOpen={setOpen}
              item={item}
              down={idx % 2 !== 0}
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
