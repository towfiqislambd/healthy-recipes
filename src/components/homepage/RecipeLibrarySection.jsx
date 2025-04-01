import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import banner from "../../assets/images/banner-8.jpg";
import RecipeCategoryCard from "../cards/RecipeCategoryCard";

const RecipeLibrarySection = () => {
  const items = [
      {
        image: banner,
        title: 'Keto Diet Recipe',
      },
      {
        image: banner,
        title: 'Mediterranean Diet Recipe',
      },
      {
        image: banner,
        title: 'Vegan Diet Recipe',
      },
      {
        image: banner,
        title: 'Paleo Diet Recipe',
      },
      {
        image: banner,
        title: 'Low-Carb Diet Recipe',
      },
      {
        image: banner,
        title: 'DASH Diet Recipe',
      },
      {
        image: banner,
        title: 'Carnivore Diet Recipe',
      },
    ];
  return (
    <section className="bg-[#FCFCFC] sm:py-24">
      <div className="container">
        <SectionTitle title="Recipe Library" />

        {/* cards  section*/}
        <div className="-mt-8">
          {/* see all button */}
          <div className="w-full flex items-center justify-end mt-5 sm:mt-0 px-2 sm:px-0">
            <Link
              to="/recipe-library"
              className="text-textColor font-merriweather sm:px-6 px-3 sm:py-3 py-2 border rounded-full border-primary hover:bg-primary transition-all duration-300 hover:text-white"
            >
              See all
            </Link>
          </div>

          {/* all cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 pt-8 px-6 sm:px-0">
            {items?.slice(0,4)?.map((item, idx) => (
              <RecipeCategoryCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeLibrarySection;
