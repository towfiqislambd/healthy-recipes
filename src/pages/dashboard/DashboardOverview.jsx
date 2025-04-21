import SharedRecipes from "@/components/dashboard/overview/SharedRecipes";
import FavoriteRecipes from "@/components/dashboard/overview/FavoriteRecipes";
import MealPlanner from "@/components/dashboard/overview/MealPlanner";
import { useGetWishlist, useMealPlannerTable, useMyRecipes } from "@/hooks/cms.queries";
import { Loader } from "@/components/loader/Loader";

const DashboardOverview = () => {
    const { data: savedRecipes, isLoading: isLoadingSavedRecipes } = useGetWishlist();
    const { data: myRecipes, isLoading: isLoadingMyRecipes } = useMyRecipes();
    const { data: mealPlannerTableData, isLoading: isLoadingMealPlanner } = useMealPlannerTable();

    const isLoading = isLoadingSavedRecipes || isLoadingMyRecipes || isLoadingMealPlanner;

    if (isLoading) {
        return <div className="flex justify-center items-center h-[85vh]"><Loader /></div>;
    }

    return (
        <section className="bg-[#F6F7FB] p-5 rounded">
            <h3 className="mb-5 text-4xl text-[#E48E19] font-semibold font-merriweather">Dashboard</h3>
            <SharedRecipes myRecipes={myRecipes} />
            <FavoriteRecipes savedRecipes={savedRecipes} />
            <MealPlanner mealPlannerTableData={mealPlannerTableData} />
        </section>
    );
};

export default DashboardOverview;