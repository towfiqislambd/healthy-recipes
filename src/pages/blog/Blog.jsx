import BlogCard from '@/components/cards/BlogCard';
import { allBlogs } from '@/data/data';

const Blog = () => {
  return (
    <div className="mt-[104px]">
      {/* title */}
      <div className="pt-20 pb-16 text-center">
        <h2 className="text-5xl font-bold font-merriweather text-black">
          Recipe Blogs & Tips
        </h2>
        <p className="mt-8 text-textColor leading-[150%] max-w-[912px] mx-auto">
          A revolutionary approach to meal planning. Cutting-edge organization
          tools crafted to save time and tailor your weekly menu to your dietary
          preferences and habits.
        </p>
      </div>

      {/* all blogs */}
      <div className="grid grid-cols-4 gap-5 container pb-20">
        {allBlogs?.map((item) => (
          <BlogCard key={item?.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
