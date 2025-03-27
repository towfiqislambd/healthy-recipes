import mealPlannerImage from '../../assets/images/meal-planner.png';
import ButtonPrimary from '../buttons/ButtonPrimary';
const OurMealPlanner = () => {
  return (
    <section className="py-24 bg-[#FCFCFC]">
      <div className="container flex items-center gap-32">
        {/* left contents */}
        <div>
          <h4 className="font-merriweather text-[40px] leading-[140%] font-bold ">
            Our Meal Planner
          </h4>

          {/* description */}
          <div className="space-y-6 mt-8">
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
          <div className='mt-10'>
            <ButtonPrimary title="Explore more" />
          </div>
        </div>
        {/* right contents */}

        <div className="bg-[#FDE0B8] px-12 py-14 rounded-lg flex-shrink-0 group overflow-hidden">
          <div>
            <img
              className="group-hover:scale-105 transition-all duration-300"
              src={mealPlannerImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMealPlanner;
