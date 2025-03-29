import RecipeCategoryCard from '../cards/RecipeCategoryCard';

const AllRecipeCardsSection = ({ items }) => {
  const rows = Math.floor(items.length / 4);
  const lastRowCount = items.length % 4;

  return (
    <div>
      <div className="pt-8 pb-10 space-y-5">
        {/* Full rows with 4 items each */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-5">
            {items.slice(rowIndex * 4, rowIndex * 4 + 4).map((item, idx) => (
              <RecipeCategoryCard key={idx} item={item} />
            ))}
          </div>
        ))}

        {/* Last row (centered if not full) */}
        {lastRowCount > 0 && (
          <div className="flex justify-center gap-5">
            {items.slice(rows * 4).map((item, idx) => (
              <RecipeCategoryCard key={idx} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecipeCardsSection;
