import { Link } from "react-router-dom";
import RecipeCard from "@/components/cards/RecipeCard";

const FavoriteRecipes = ({ savedRecipes }) => {
    return (
        <div className="mb-10">
            <div className="flex mb-6 justify-between items-center">
                <h3 className="font-merriweather font-semibold text-[#141414] text-xl">Your favorite recipes</h3>
                <button>
                    <Link to='/dashboard/dashboard-saved-recipes' className="text-primary font-poppins font-medium">View all</Link>
                </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5 2xl:px-0">
                {
                    savedRecipes?.wishlist?.data?.length > 0 ?
                        savedRecipes?.wishlist?.data?.slice(0, 4)?.map((item, idx) => (
                            <RecipeCard
                                isMyRecipe={true}
                                key={idx}
                                item={item}
                            />
                        ))
                        :
                        'No data found'
                }
            </div>
        </div>
    );
};

export default FavoriteRecipes;