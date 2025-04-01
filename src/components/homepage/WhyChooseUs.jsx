import SectionTitle from "../common/SectionTitle";
import {
  DietaryFilterSvg,
  MealPannerSvg,
  RecipeLibrarySvg,
  RecipeShareSvg,
} from "../svg-container/SvgContainer";

const WhyChooseUs = () => {
  const chooseUsData = [
    {
      svg: <RecipeLibrarySvg />,
      title: "Recipe library",
      description:
        "A recipe-sharing website helps food lovers discover, create, and share recipes while growing a community.",
    },
    {
      svg: <RecipeShareSvg />,
      title: "Recipe Sharing",
      description:
        "A recipe-sharing website helps food lovers discover, create, and share recipes while growing a community.",
    },
    {
      svg: <MealPannerSvg />,
      title: "Meal planner",
      description:
        "A recipe-sharing website helps food lovers discover, create, and share recipes while growing a community.",
    },
    {
      svg: <DietaryFilterSvg />,
      title: "Dietary filters",
      description:
        "A recipe-sharing website helps food lovers discover, create, and share recipes while growing a community.",
    },
  ];
  return (
    <section className="sm:py-20 py-10 bg-[#FCFCFC]">
      <div className="container">
        {/* section title */}
        <SectionTitle title="Why Choose Us" />

        {/* contents */}
        <div className="sm:mt-10 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 px-5 sm:px-0">
          {chooseUsData?.map((item, idx) => (
            <div key={idx} className="w-full sm:space-y-4 space-y-2">
              <div className="flex items-center gap-2 justify-center w-full">
                {item?.svg}{" "}
                <h5 className="sm:text-3xl text-xl leading-[140%] text-primary font-merriweather">
                  {item?.title}
                </h5>
              </div>
              <p className="leading-[150%] text-textColor text-center">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
