import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import banner from '../../assets/images/banner-8.jpg';
import RecipeCard from '../cards/RecipeCard';
import RecipeCategoryCard from '../cards/RecipeCategoryCard';

const RecipeLibrarySection = () => {
  const items = [
    {
      image: banner,
    },
    {
      image: banner,
    },
    {
      image: banner,
    },
    {
      image: banner,
    },
  ];
  return (
    <section className="bg-[#FCFCFC] py-24">
      <div className="container">
        <SectionTitle title="Recipe Library" />

        {/* cards  section*/}
        <div className="-mt-8">
          {/* see all button */}
          <div className="w-full flex items-center justify-end">
            <Link to='/recipe-library' className="text-textColor font-merriweather px-6 py-3 border rounded-full border-primary hover:bg-primary transition-all duration-300 hover:text-white">
              See all
            </Link>
          </div>

          {/* all cards */}
          <div className="grid grid-cols-4 gap-5 pt-8">
            {items?.map((item, idx) => (
              <RecipeCategoryCard  key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeLibrarySection;
