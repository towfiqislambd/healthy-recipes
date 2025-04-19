import { useState } from 'react';
import RecipeCard from '../../components/cards/RecipeCard';
import { useGetWishlist, useAllCategories } from '@/hooks/cms.queries';

const DashboardSavedRecipes = () => {
    const [activeTab, setActiveTab] = useState({ id: 0, category_name: 'All Recipes' });
    const [activePage, setActivePage] = useState(1);
    const { data: savedRecipes, isLoading, isFetching, isPending } = useGetWishlist(activePage, activeTab?.id);
    console.log(savedRecipes)
    const { data: allCategories } = useAllCategories();
    if (isLoading || isFetching || isPending) return <p className="h-svh">loading....</p>;

    return (
        <section className="p-5">
            <h3 className="mb-7 text-2xl text-[#E48E19] font-semibold font-merriweather">Your favorite recipes</h3>

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
                    savedRecipes?.wishlist?.data.length > 0 ?
                        savedRecipes?.wishlist?.data?.map((item, idx) => (
                            <RecipeCard
                                isMyRecipe={true}
                                key={idx}
                                item={item?.recipe}
                            />
                        ))
                        :
                        'No data found'
                }
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center items-center gap-3">
                {
                    savedRecipes?.wishlist?.links.map((item, idx) => <button onClick={() => setActivePage(item?.url.split('=')[1])} key={idx} className='px-3 py-1 rounded border'>{item?.label}</button>)
                }
            </div>
        </section>
    );
};

export default DashboardSavedRecipes;
