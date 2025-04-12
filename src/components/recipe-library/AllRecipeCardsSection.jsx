import RecipeCategoryCard from "../cards/RecipeCategoryCard";

const AllRecipeCardsSection = ({ data }) => {

  return (
    <div>
      <div className="pt-7 lg:pb-10 space-y-5">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {
            data?.map((item, idx) => (
              <RecipeCategoryCard key={idx} item={item} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default AllRecipeCardsSection;
