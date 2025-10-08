import React from "react";
import BlogCard from "@/Components/Cards/BlogCard";
import { getRecentBLogs } from "@/Hooks/api/cms_api";
import Container from "@/Components/Common/Container";

type blogItem = {
  slug: string;
  title: string;
  author_name: string;
  author_image: string;
  description: string;
  image: string;
  created_date: string;
  category: { category_name: string };
  time_ago: string;
};

const page = async () => {
  const blogData = await getRecentBLogs();

  return (
    <section className="mt-14">
      <Container>
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="text-center">
            {/* Title */}
            <h2 className="text-2xl xl:text-3xl 3xl:text-5xl font-bold font-merriweather text-black">
              Recipe Blogs & Tips
            </h2>

            {/* Short Description */}
            <p className="xl:mt-8 mt-4 text-textColor leading-[150%] lg:max-w-[912px] mx-auto text-sm lg:text-base">
              A revolutionary approach to meal planning. Cutting-edge
              organization tools crafted to save time and tailor your weekly
              menu to your dietary preferences and habits.
            </p>
          </div>

          {/* All Blogs */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-5 mt-10 mb-10 3xl:mb-14 3xl:mt-14">
            {blogData?.data?.map((item: blogItem, idx: number) => (
              <BlogCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default page;
