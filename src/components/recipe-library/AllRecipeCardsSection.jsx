import banner from '@/assets/images/banner-8.jpg';
import RecipeCard from '../cards/RecipeCard';
import RecipeCategoryCard from '../cards/RecipeCategoryCard';

const AllRecipeCardsSection = () => {
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
    <div>
      <div className="grid grid-cols-4 gap-5 pt-8 pb-10">
        {items?.map((item, idx) => (
          <RecipeCategoryCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllRecipeCardsSection;
