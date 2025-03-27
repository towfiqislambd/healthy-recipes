import RecipeBlogs from '@/components/homepage/RecipeBlogs';
import ShareYourRecipeSection from '@/components/homepage/ShareYourRecipeSection';
import AllRecipeCardsSection from '@/components/recipe-library/AllRecipeCardsSection';
import { Link } from 'react-router-dom';

const RecipeLibrary = () => {
  return (
    <div className="mt-[104px]">
      {/* breadcrumbs */}
      <div className="container pt-12">
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="text-[#8993A4] hover:text-primary leading-[130%] transition-all divide-blue-300"
          >
            Home
          </Link>
          <span className="text-gray-500"> {'>'} </span>
          <Link
            to="/recipe-library"
            className="text-textColor hover:text-primary leading-[130%] transition-all divide-blue-300"
          >
            Recipe Library
          </Link>
        </div>
      </div>

      {/* contents */}
      <div className="mt-10 container ">
        {/* section title */}
        <h2 className="text-black text-5xl font-bold leading-[130%]">
          All Recipe Library
        </h2>

        <AllRecipeCardsSection />
      </div>

      <ShareYourRecipeSection />

      <RecipeBlogs />
    </div>
  );
};

export default RecipeLibrary;
