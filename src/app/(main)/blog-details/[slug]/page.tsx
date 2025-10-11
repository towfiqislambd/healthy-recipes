import {
  getBlogDetails,
  getRecentBLogs,
  getShareRecipesData,
} from "@/Hooks/api/cms_api";
import React from "react";
import Image from "next/image";
import Container from "@/Components/Common/Container";
import RecentBlogs from "@/Components/PageComponents/mainPages/homePageComponents/RecentBlogs";
import ShareYourMeal from "@/Components/PageComponents/mainPages/homePageComponents/ShareYourMeal";
import UpperBlog from "@/Components/PageComponents/mainPages/blogPageComponents/UpperBlog";

const page = async ({ params }: any) => {
  const { slug } = params;
  const blogDetails = await getBlogDetails(slug);
  const shareRecipeData = await getShareRecipesData();
  const blogData = await getRecentBLogs();

  return (
    <>
      <UpperBlog data={blogDetails?.data} />

      {/* Blog Image */}
      <Container>
        <div className="h-[220px] sm:h-[250px] lg:h-[320px] xl:h-[400px] 2xl:h-[520px] rounded-2xl lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 relative w-full overflow-hidden -mt-[130px] lg:-mt-32 xl:-mt-28 xl:mb-10 2xl:mb-20">
          <Image
            className="w-full h-full object-cover rounded-2xl"
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${blogDetails?.data?.image}`}
            fill
            alt="banner-image"
          />
        </div>
      </Container>

      {/* Blog Contents */}
      <Container>
        <div
          dangerouslySetInnerHTML={{
            __html: blogDetails?.data?.description,
          }}
          className="2xl:max-w-[1010px] mx-auto lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 mt-5 md:mt-10 xl:mt-0 mb-10 2xl:mb-20 text-accent-gray leading-[160%]"
        />
      </Container>

      <ShareYourMeal data={shareRecipeData?.data} />

      <RecentBlogs data={blogData?.data} />
    </>
  );
};

export default page;
