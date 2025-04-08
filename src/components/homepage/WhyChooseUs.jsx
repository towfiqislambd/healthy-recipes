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
    <section className="2xl:py-20 py-8 md:py-12 bg-[#FCFCFC]">
      <div className="container">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* section title */}
          <SectionTitle title="Why Choose Us" />

          {/* contents */}
          <div className="mt-5 lg:mt-7 3xl:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-12 px-5 sm:px-0">
            {chooseUsData?.map((item, idx) => (
              <div key={idx} className="w-full sm:space-y-4 space-y-2">
                <div className="flex items-center gap-2 justify-center w-full">
                  {item?.svg}{" "}
                  <h5 className="text-xl 3xl:text-3xl leading-[140%] text-primary font-merriweather">
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
      </div>
    </section>
  );
};

export default WhyChooseUs;
