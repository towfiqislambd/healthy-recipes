import { useState } from "react";
import ReviewLeftSection from "./ReviewLeftSection";
import ReviewCard from "../cards/ReviewCard";

const ReviewSection = ({ id, allReviews, refetch }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;

  const startIdx = page * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = allReviews.slice(startIdx, endIdx);

  const hasMore = endIdx < allReviews.length;

  const handleSeeMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section className="container py-8 xl:py-10 2xl:py-16 3xl:py-24">
      <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 flex flex-col xl:flex-row items-center gap-5 xl:gap-10 3xl:gap-12">
        {/* left side contents */}
        <div className="w-full xl:flex-1">
          <ReviewLeftSection id={id} refetch={refetch} />
        </div>

        {/* right side contents */}
        <div className="space-y-5 xl:flex-1 w-full">
          {allReviews.length > 0 ? (
            <>
              {currentItems.map((item, idx) => (
                <ReviewCard key={startIdx + idx} data={item} />
              ))}
              {hasMore && (
                <div className="pt-2">
                  <button
                    onClick={handleSeeMore}
                    className="text-primary font-medium hover:underline"
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>No review yet</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;