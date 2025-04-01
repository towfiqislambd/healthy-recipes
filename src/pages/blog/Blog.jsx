import BlogCard from "@/components/cards/BlogCard";
import { allBlogs } from "@/data/data";

const Blog = () => {
  return (
    <div className="mt-[104px]">
      {/* title */}
      <div className="xl:pt-20 lg:pt-14 md:pt-10 pt-14 xl:pb-16 lg:pb-8 text-center">
        <h2 className="lg:text-3xl xl:text-5xl md:text-3xl text-2xl font-bold font-merriweather text-black">
          Recipe Blogs & Tips
        </h2>
        <p className="xl:mt-8 mt-4 text-textColor leading-[150%] lg:max-w-[912px] mx-auto text-sm lg:text-base px-3 md:px-5 lg:px-0">
          A revolutionary approach to meal planning. Cutting-edge organization
          tools crafted to save time and tailor your weekly menu to your dietary
          preferences and habits.
        </p>
      </div>

      {/* all blogs */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 container pb-10 lg:pb-20 px-5 md:px-0 lg:px-0 mt-5 lg:mt-0">
        {allBlogs?.map((item) => (
          <BlogCard key={item?.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
