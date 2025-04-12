import BlogCard from "@/components/cards/BlogCard";
import { useBlogs } from "@/hooks/cms.queries";

const Blog = () => {
  const { data: blogs } = useBlogs();
  
  return (
    <section className="mt-[110px] lg:mt-[154px]">
      <div className="container">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* title */}
          <div className="text-center">
            <h2 className="text-2xl xl:text-3xl 3xl:text-5xl font-bold font-merriweather text-black">
              Recipe Blogs & Tips
            </h2>
            <p className="xl:mt-8 mt-4 text-textColor leading-[150%] lg:max-w-[912px] mx-auto text-sm lg:text-base">
              A revolutionary approach to meal planning. Cutting-edge organization
              tools crafted to save time and tailor your weekly menu to your dietary
              preferences and habits.
            </p>
          </div>

          {/* all blogs */}
          <div className="grid lg:grid-cols-2  2xl:grid-cols-3 3xl:grid-cols-4 gap-5 mt-10 mb-10 3xl:mb-14 3xl:mt-14">
            {blogs?.map((item, idx) => (
              <BlogCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
