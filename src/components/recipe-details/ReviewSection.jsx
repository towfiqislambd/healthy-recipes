import ReviewLeftSection from './ReviewLeftSection';
import { allReviews } from '@/data/data';
import ReviewCard from '../cards/ReviewCard';

const ReviewSection = () => {
  return (
    <section className="container py-24 flex items-center gap-8">
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
