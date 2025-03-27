import SectionTitle from '../common/SectionTitle';
import {
  DietaryFilterSvg,
  MealPannerSvg,
  RecipeLibrarySvg,
  RecipeShareSvg,
} from '../svg-container/SvgContainer';

const WhyChooseUs = () => {
  const chooseUsData = [
    {
      svg: <RecipeLibrarySvg />,
      title: 'Recipe library',
      description:
        'A recipe-sharing website helps food lovers discover, create, and share recipes while growing a community.',
    },
    {
      svg: <RecipeShareSvg />,
      title: 'Recipe Sharing',
      description:
        'A recipe-sharing website helps food lovers discover, create, and share recipes while growing a community.',
    },
    {
      svg: <MealPannerSvg />,
      title: 'Meal planner',
      description:
        'A recipe-sharing website helps food lovers discover, create, and share recipes while growing a community.',
    },
    {
      svg: <DietaryFilterSvg />,
      title: 'Dietary filters',
      description:
        'A recipe-sharing website helps food lovers discover, create, and share recipes while growing a community.',
    },
  ];
  return (
    <section className="py-20 bg-[#FCFCFC]">
      <div className="container">
        {/* section title */}
        <SectionTitle title="Why Choose Us" />

        {/* contents */}
        <div className="mt-10 grid grid-cols-4 gap-12">
          {chooseUsData?.map((item, idx) => (
            <div key={idx} className="w-full space-y-4">
              <div className="flex items-center gap-2 justify-center w-full">
                {item?.svg}{' '}
                <h5 className="text-3xl leading-[140%] text-primary font-merriweather">
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
