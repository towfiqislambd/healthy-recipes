import { Link } from "react-router-dom";
import MyRecipeCard from "@/pages/dashboard/MyRecipeCard";
import deleteImg from "../../../assets/images/delete.png";

const SharedRecipes = ({ myRecipes }) => {
    return (
        <div className="mb-8 sm:mb-10">
            <div className="flex mb-4 sm:mb-6 justify-between items-center">
                <h3 className="font-merriweather font-semibold text-[#141414] text-lg sm:text-xl">Your shared recipes</h3>
                <button>
                    <Link to='/dashboard/dashboard-my-recipes' className="text-primary font-poppins font-medium text-sm sm:text-base">View all</Link>
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
                        <div className="text-center col-span-4 py-6 space-y-3">
                            <img src={deleteImg} alt="logo" className="mx-auto size-16" />
                            <p className="text-primary font-merriweather md:text-lg lg:text-xl">No shared recipes found yet</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default SharedRecipes;