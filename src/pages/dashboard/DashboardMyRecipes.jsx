import { useState } from 'react';
import RecipeCard from '../../components/cards/RecipeCard';
import { useAllCategories, useMyRecipes } from '@/hooks/cms.queries';

const DashboardSavedRecipes = () => {
    const [activeTab, setActiveTab] = useState({ id: 0, category_name: 'All Recipes' });
    const [activePage, setActivePage] = useState(1);
    const { data: allCategories } = useAllCategories();
    const { data: myRecipes, isLoading, isFetching, isPending } = useMyRecipes(activePage, activeTab?.id);
    
    if (isLoading || isFetching || isPending) return <p className="h-svh">loading....</p>;

    return (
        <section className="p-5">
            <h3 className="mb-7 text-2xl text-[#E48E19] font-semibold font-merriweather">Your shared recipes</h3>

            {/* Tabs */}
            <div className="py-8 w-full flex flex-wrap items-center justify-center 2xl:justify-between gap-x-1 gap-y-2">
                <button
                    onClick={() => setActiveTab({ id: 0, category_name: 'All Recipes' })}
                    className={`px-4 2xl:px-6 2xl:py-3 py-2 rounded-full font-medium ${activeTab?.category_name === 'All Recipes'
                        ? 'bg-[#3A3A3A] text-white'
                        : 'bg-transparent text-textColor'
                        }`}
                >
                    All Recipes
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
                    </button>
                ))}
            </div>


            {/* cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5 2xl:px-0">
                {
                    myRecipes?.recipes?.data.length > 0 ?
                        myRecipes?.recipes?.data?.map((item, idx) => (
                            <RecipeCard
                                isSavedRecipe={true}
                                isMyRecipe={false}
                                key={idx}
                                item={item}
                            />
                        ))
                        :
                        'No data found'
                }
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
                {myRecipes?.recipes?.links.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => item.url && setActivePage(item.url.split('=')[1])}
                        className={`px-3 py-1 rounded border transition-all duration-150 
        ${item.active ? 'bg-primary text-white' : 'bg-white text-gray-700'} 
        ${!item.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                        disabled={!item.url}
                        dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                ))}
            </div>

        </section>
    );
};

export default DashboardSavedRecipes;
