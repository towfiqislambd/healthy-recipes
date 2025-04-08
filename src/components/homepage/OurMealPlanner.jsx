import mealPlannerImage from "../../assets/images/meal-planner.png";
import ButtonPrimary from "../buttons/ButtonPrimary";
const OurMealPlanner = () => {
  return (
    <section className="py-7 md:py-12 2xl:py-16 3xl:py-20 bg-[#FCFCFC]">
      <div className="container">
        <div className="flex flex-col xl:flex-row items-center gap-8 xl:gap-12 3xl:gap-32 lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* left contents */}
          <div className="flex-1">
            <h4 className="font-merriweather text-2xl 2xl:text-3xl 3xl:text-[40px] leading-[140%] font-bold">
              Our Meal Planner
            </h4>

            {/* description */}
            <div className="space-y-3 2xl:space-y-6 mt-3 2xl:mt-5 3xl:mt-8">
              <p className="text-textColor leading-[150%]">
                Our Meal Planner tool is designed to make healthy eating
                effortless and personalized for every age group. Whether you're
                planning meals for your toddler, teen, or aging parents, you can
                easily browse recipes based on dietary needs, nutritional goals,
                and personal preferences.
              </p>
              <p className="text-textColor leading-[150%]">
                Simply select your desired meals for the week, and our tool
                automatically organizes them into a structured meal plan. Plus,
                with the built-in grocery list feature, you can generate a
                shopping list in seconds—no more forgetting key ingredients!
              </p>
              <p className="text-textColor leading-[150%]">
                Adjust portion sizes, swap recipes, and track your nutritional
                intake to ensure balanced meals for the whole family. With our
                Meal Planner, cooking becomes stress-free, organized, and fun!
              </p>
            </div>

            {/* explore more */}
            <div className="2xl:mt-10 mt-5">
              <ButtonPrimary title="Explore more" />
            </div>
          </div>
          {/* right contents */}
          <div className="bg-[#FDE0B8] px-6 sm:px-12 sm:py-14 py-7 rounded-lg flex-1 group overflow-hidden w-full">
            <div>
              <img
                className="group-hover:scale-105 transition-all duration-500 rounded-md w-full"
                src={mealPlannerImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMealPlanner;
