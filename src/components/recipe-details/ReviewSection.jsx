import ReviewLeftSection from "./ReviewLeftSection";
import ReviewCard from "../cards/ReviewCard";
import { useState } from "react";
import { useRecipeReviews } from "@/hooks/cms.queries";

const ReviewSection = ({ id }) => {
  const [activePage, setActivePage] = useState(1);
  const { data: allReviews, isLoading, refetch } = useRecipeReviews(id, activePage);

  if (isLoading) return <p className="h-svh">loading....</p>;

  return (
    <section className="container py-8 xl:py-10 2xl:py-16 3xl:py-24">
      <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 flex flex-col xl:flex-row items-center gap-5 xl:gap-10 3xl:gap-12">
        {/* left side contents */}
        <div className="w-full xl:flex-1">
          <ReviewLeftSection id={id} refetch={refetch} />
        </div>

        {/* right side contents */}
        <div className="space-y-5 xl:flex-1 w-full">
          {
            allReviews.data?.length > 0 ?
              allReviews?.data?.map((item, idx) =>
                <ReviewCard key={idx} data={item} />
              )
              :
              <p>No review yet</p>
          }

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
            {allReviews?.links.map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.url && setActivePage(item.url.split('=')[1])}
                className={`px-3 py-1 rounded border transition-all duration-150 
        ${item.active ? 'bg-primary text-white' : 'bg-white text-gray-700'} 
        ${!item.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                disabled={!item.url}
                dangerouslySetInnerHTML={{ __html: item.label }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;