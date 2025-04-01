import AllRecipesTabs from '@/components/all-recipes/AllRecipesTabs';
import RecipeBlogs from '@/components/homepage/RecipeBlogs';
import ShareYourRecipeSection from '@/components/homepage/ShareYourRecipeSection';
import { Link, useParams } from 'react-router-dom';

const AllRecipes = () => {
  const slug = useParams().slug;
  const recipeTitle = slug
    .split('-')
    ?.map((item) => item.charAt(0).toUpperCase() + item?.slice(1))
    ?.join(' ');

  return (
    <div className="mt-[104px]">
      {/* breadcrumbs */}
      <div className="container pt-20">
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
            className="text-[#8993A4] hover:text-primary leading-[130%] transition-all divide-blue-300"
          >
            All Recipe Library
          </Link>
          <span className="text-gray-500"> {'>'} </span>
          <Link
            to={`/recipe-library/${slug}`}
            className="text-textColor hover:text-primary leading-[130%] transition-all divide-blue-300"
          >
            {recipeTitle}
          </Link>
        </div>
      </div>

      {/* title */}
      <div className="mt-10 container">
        <h2 className="text-4xl font-merriweather font-bold leading-[130%] text-black">
         {recipeTitle}
        </h2>
      </div>

      {/* tabs */}
      <AllRecipesTabs />

      <ShareYourRecipeSection />

      <RecipeBlogs />
    </div>
  );
};

export default AllRecipes;
