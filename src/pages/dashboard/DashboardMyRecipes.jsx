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
import RecipeCard from '../../components/cards/RecipeCard';

const DashboardSavedRecipes = () => {
    const [activeTab, setActiveTab] = useState(allTabs[0]);
    const [updatedRecipes, setUpdatedRecipes] = useState(allRecipes);


    //functions:
    const getCountByType = (type) => {
        if (type === 'All recipes') {
            return updatedRecipes?.length;
        } else {
            return updatedRecipes?.filter((recipe) => recipe.type === type)?.length;
        }
    };


    const filteredRecipes =
        activeTab?.title == 'All recipes'
            ? updatedRecipes
            : updatedRecipes?.filter((recipe) => recipe.type === activeTab?.title);

    return (
        <section className="p-5">
            <h3 className="mb-7 text-2xl text-[#E48E19] font-semibold font-merriweather">Your shared recipes</h3>
            {/* tabs */}
            <div className="mb-10 w-full flex flex-wrap items-center xl:justify-between px-5 2xl:px-0 gap-1 md:gap-1">
                {allTabs?.map((tab) => (
                    <button
                        key={tab.title}
                        onClick={() => setActiveTab(tab)}
                        className={`lg:px-6 px-3 lg:py-3 py-2 rounded-full  font-medium  ${tab?.title === activeTab?.title
                            ? 'bg-[#3A3A3A] text-white'
                            : 'bg-transparent text-textColor'
                            }`}
                    >
                        {tab?.title}
                        <span>({getCountByType(tab?.title)})</span>
                    </button>
                ))}
            </div>

            {/* cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5 2xl:px-0">
                {filteredRecipes?.map((item, idx) => (
                    <RecipeCard
                        key={idx}
                        item={item}
                        down={idx % 2 !== 0}
                    />
                ))}
            </div>
        </section>
    );
};

export default DashboardSavedRecipes;
