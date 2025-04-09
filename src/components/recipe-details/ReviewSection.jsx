import ReviewLeftSection from "./ReviewLeftSection";
import { allReviews } from "@/data/data";
import ReviewCard from "../cards/ReviewCard";

const ReviewSection = () => {
  return (
    <section className="container py-10 xl:py-16 3xl:py-24">
      <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 flex flex-col xl:flex-row items-center gap-5 xl:gap-10 3xl:gap-12">
        {/* left side contents */}
        <div className="xl:flex-1 w-full">
          <ReviewLeftSection />
        </div>

        {/* right side contents */}
        <div className="space-y-5 xl:flex-1">
          {allReviews?.map((item, idx) => (
            <ReviewCard key={idx} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
