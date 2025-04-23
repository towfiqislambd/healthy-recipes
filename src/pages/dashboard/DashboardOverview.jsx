import SharedRecipes from "@/components/dashboard/overview/SharedRecipes";
import FavoriteRecipes from "@/components/dashboard/overview/FavoriteRecipes";
import MealPlanner from "@/components/dashboard/overview/MealPlanner";
import { useGetWishlist, useMealPlannerTable, useMyRecipes } from "@/hooks/cms.queries";
import { Loader } from "@/components/loader/Loader";
import { useState } from "react";

const DashboardOverview = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const { data: savedRecipes, isLoading: isLoadingSavedRecipes } = useGetWishlist();
    const { data: myRecipes, isLoading: isLoadingMyRecipes } = useMyRecipes();
    const { data: mealPlannerTableData, isLoading: isLoadingMealPlanner } = useMealPlannerTable(null, selectedMonth);

    const isLoading = isLoadingSavedRecipes || isLoadingMyRecipes || isLoadingMealPlanner;

    if (isLoading) {
        return <div className="flex justify-center items-center h-[85vh]"><Loader /></div>;
    }

    return (
        <section className="bg-[#F6F7FB] p-4 sm:p-5 rounded">
            <h3 className="mb-2 sm:mb-3 3xl:mb-5 text-[22px] sm:text-2xl 3xl:text-3xl 4xl:text-4xl text-[#E48E19] font-semibold font-merriweather">Dashboard</h3>
            <SharedRecipes myRecipes={myRecipes} />
            <FavoriteRecipes savedRecipes={savedRecipes} />
            <MealPlanner mealPlannerTableData={mealPlannerTableData} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />
        </section>
    );
};

export default DashboardOverview;