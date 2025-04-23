import { Link } from "react-router-dom";
import MyRecipeCard from "@/pages/dashboard/MyRecipeCard";

const SharedRecipes = ({ myRecipes }) => {
    return (
        <div className="mb-10">
            <div className="flex mb-6 justify-between items-center">
                <h3 className="font-merriweather font-semibold text-[#141414] text-xl">Your shared recipes</h3>
                <button>
                    <Link to='/dashboard/dashboard-my-recipes' className="text-primary font-poppins font-medium">View all</Link>
                </button>
            </div>
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-5 3xl:px-5">
                {
                    myRecipes?.recipes?.data?.length > 0 ?
                        myRecipes?.recipes?.data?.slice(0, 4)?.map((item, idx) => (
                            <MyRecipeCard
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

export default SharedRecipes;