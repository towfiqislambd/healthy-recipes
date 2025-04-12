import { useState } from 'react';
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
import { allRecipes } from '@/data/data';
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

const MealPlannerTabSection = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(allTabs[0]);
  const [updatedRecipes, setUpdatedRecipes] = useState(allRecipes);
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [plannerItem, setPlannerItem] = useState();
  const [tableData, setTableData] = useState([]);
  const filterClass = `text-base py-3 px-4 focus:bg-primary font-poppins text-textColor focus:text-white cursor-pointer`;

  //functions:
  const getCountByType = (type) => {
    if (type === 'All recipes') {
      return updatedRecipes?.length;
    } else {
      return updatedRecipes?.filter((recipe) => recipe.type === type)?.length;
    }
  };

  const handleFilterChange = (age) => {
    // Update updatedRecipes based on the selected allergen
    const filteredRecipes = allRecipes.filter((item) => item?.for === age);
    setSelectedAge(age);
    setUpdatedRecipes(filteredRecipes);
  };

  const handleDietChange = (diet) => {
    // Update updatedRecipes based on the selected allergen
    const filteredRecipes = allRecipes.filter((item) => item?.diet === diet);
    setSelectedDiet(diet);
    setUpdatedRecipes(filteredRecipes);
  };

  const handleReset = () => {
    setSelectedAge('');
    setSelectedDiet('');
    setActiveTab(allTabs[0]);
    setUpdatedRecipes(allRecipes);
  };

  const filteredRecipes =
    activeTab?.title == 'All recipes'
      ? updatedRecipes
      : updatedRecipes?.filter((recipe) => recipe.type === activeTab?.title);

  const handleAddMealFunc = (item) => {
    setPlannerItem(item)
  }
  return (
    <section className="py-5 3xl:py-12 container">
      <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
        {/* tabs */}
        <div className="py-8 w-full flex flex-wrap items-center justify-center 2xl:justify-between gap-x-1 gap-y-2">
          {allTabs?.map((tab) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(tab)}
              className={`px-4 2xl:px-6 2xl:py-3 py-2 rounded-full  font-medium
          ${tab?.title === activeTab?.title
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

        {/* filters */}
        <div className="my-2 w-full md:w-[400px] lg:w-auto mx-auto border lg:border-none p-5 rounded-lg lg:p-0 3xl:py-12 flex flex-col lg:flex-row items-center justify-center gap-3 2xl:gap-5">
          <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-3 lg:gap-0">
            {/* age */}
            <Select value={selectedAge} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-full lg:w-[280px] xl:w-[300px] 2xl:w-[460px] lg:h-14 h-11 lg:rounded-l-full lg:px-6 px-3 text-base focus:ring-primary">
                <SelectValue placeholder="Filter by age group" />
              </SelectTrigger>
              <SelectContent className="px-0 py-0">
                <SelectItem value="teen" className={filterClass}>
                  Teen (13-19 years)
                </SelectItem>
                <SelectItem value="adult" className={filterClass}>
                  Adult (20-39 years)
                </SelectItem>
                <SelectItem value="middle-adulthood" className={filterClass}>
                  Middle adulthood (40-59 years)
                </SelectItem>
                <SelectItem value="senior-adult" className={filterClass}>
                  Senior Adult (60+)
                </SelectItem>
              </SelectContent>
            </Select>

            {/* diet */}
            <Select value={selectedDiet} onValueChange={handleDietChange}>
              <SelectTrigger className="w-full lg:w-[280px] xl:w-[300px] 2xl:w-[450px] lg:h-14 h-11 lg:rounded-r-full lg:border-l-0 px-3 lg:px-6 text-base focus:ring-primary">
                <SelectValue placeholder="Filter by diet" />
              </SelectTrigger>
              <SelectContent className="px-0 py-0">
                <SelectItem value="keto-diet" className={filterClass}>
                  Keto Diet Recipe
                </SelectItem>
                <SelectItem value="mediterranean-diet" className={filterClass}>
                  Mediterranean Diet Recipe
                </SelectItem>
                <SelectItem value="vegan-diet" className={filterClass}>
                  Vegan Diet Recipe
                </SelectItem>
                <SelectItem value="paleo-diet" className={filterClass}>
                  Paleo Diet Recipe
                </SelectItem>
                <SelectItem value="low-carb-diet" className={filterClass}>
                  Low-Carb Diet Recipe
                </SelectItem>
                <SelectItem value="dash-diet" className={filterClass}>
                  DASH Diet Recipe
                </SelectItem>
                <SelectItem value="carnivore-diet" className={filterClass}>
                  Carnivore Diet Recipe
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={handleReset}
            className="h-11 lg:h-14 w-full lg:w-auto px-3 justify-center lg:px-6 border border-primary rounded-full flex items-center gap-2 bg-primary text-white transition-all duration-300 hover:bg-transparent hover:text-primary"
          >
            <RiResetLeftFill />
            Reset
          </button>
        </div>

        {/* cards */}
        <div className="mt-10 grid lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
          {filteredRecipes?.map((item, idx) => (
            <RecipeCard
              isMyRecipe={true}
              setOpen={setOpen}
              isPlanner={true}
              key={idx}
              item={item}
              down={idx % 2 !== 0}
              handleAddMealFunc={handleAddMealFunc}
            />
          ))}
        </div>
      </div>

      {/* modal */}
      <Modal open={open} setOpen={setOpen}>
        <AddMealModal tableData={tableData} setTableData={setTableData} plannerItem={plannerItem} open={open} setOpen={setOpen} />
      </Modal>
    </section>
  );
};

export default MealPlannerTabSection;
