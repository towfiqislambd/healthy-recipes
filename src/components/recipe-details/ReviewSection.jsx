import ReviewLeftSection from "./ReviewLeftSection";
import { allReviews } from "@/data/data";
import ReviewCard from "../cards/ReviewCard";

const ReviewSection = () => {
  return (
    <section className="container lg:py-24 py-12 flex lg:flex-row flex-col items-center gap-8 px-5 2xl:px-0">
      {/* left side contents */}
      <ReviewLeftSection />

      {/* right side contents */}
      <div className="space-y-5">
        {allReviews?.map((item, idx) => (
          <ReviewCard key={idx} data={item} />
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
