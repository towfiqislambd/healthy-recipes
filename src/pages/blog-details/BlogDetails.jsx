import CommonHeroBanner from "@/components/common/CommonHeroBanner";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import RecipeBlogs from "@/components/homepage/RecipeBlogs";
import { useParams } from "react-router-dom";
import { useBlogDetails, useBlogs, useShareYourRecipe } from "@/hooks/cms.queries";
import parse from 'html-react-parser';
import { Loader } from "@/components/loader/Loader";

const BlogDetails = () => {
  const { slug } = useParams();
  const { data: blogDetail, isLoading: isLoadingBlogDetail } = useBlogDetails(slug);
  const { data: shareYourRecipe, isLoading: isLoadingSharedRecipes } = useShareYourRecipe();
  const { data: blogs, isLoading: isLoadingBlogs } = useBlogs();

  const isLoading = isLoadingBlogDetail || isLoadingSharedRecipes || isLoadingBlogs;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }


  return (
    <div className="mt-[104px]">
      <div>
        <CommonHeroBanner
          image={`${import.meta.env.VITE_SITE_URL}/${blogDetail?.image}`}
          title={blogDetail?.title}
        />

        {/* contents */}
        <div className="container mt-5 md:mt-10 xl:mt-0 mb-10 2xl:mb-20">
          <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            <section className="2xl:max-w-[1010px] mx-auto">
              {/* details */}
              <div className="text-textColor leading-[160%]">
                {typeof blogDetail?.description === 'string' && parse(blogDetail.description)}
              </div>
            </section>
          </div>
        </div>
      </div>

      <ShareYourRecipeSection data={shareYourRecipe} />
      <RecipeBlogs data={blogs} />
    </div>
  );
};

export default BlogDetails;
