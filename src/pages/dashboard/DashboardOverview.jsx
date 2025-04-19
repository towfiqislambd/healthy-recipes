import SharedRecipes from "@/components/dashboard/overview/SharedRecipes";
import FavoriteRecipes from "@/components/dashboard/overview/FavoriteRecipes";
import MealPlanner from "@/components/dashboard/overview/MealPlanner";
import { useGetWishlist, useMyRecipes } from "@/hooks/cms.queries";

const DashboardOverview = () => {
    const { data: savedRecipes } = useGetWishlist();
    const { data: myRecipes } = useMyRecipes();

    return (
        <section className="bg-[#F6F7FB] p-5 rounded">
            <h3 className="mb-5 text-4xl text-[#E48E19] font-semibold font-merriweather">Dashboard</h3>
            <SharedRecipes myRecipes={myRecipes} />
            <FavoriteRecipes savedRecipes={savedRecipes} />
            <MealPlanner />
        </section>
    );
};

export default DashboardOverview;