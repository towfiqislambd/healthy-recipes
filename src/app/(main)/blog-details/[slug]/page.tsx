"use client";
import Container from "@/Components/Common/Container";
import { BackArrowSvg } from "@/Components/Svg/SvgContainer";
import { getBlogDetails } from "@/Hooks/api/cms_api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const page = ({ params }: Props) => {
  const { slug } = use(params);
  const router = useRouter();

  const { data: blogDetails, isLoading } = getBlogDetails(slug);

  return (
    <div className="mt-[80px] sm:mt-[85px] xl:mt-[104px]">
      <div>
        {/* Banner */}
        <section>
          <div className="bg-[#B7E4C7] pt-5 lg:pt-10 3xl:pt-16 pb-40 ">
            {/* contents */}
            <Container>
              <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
                {/* back button */}
                <div>
                  <div
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#373E85] group cursor-pointer"
                  >
                    <div className="group-hover:-translate-x-1 duration-300 transition-all">
                      <BackArrowSvg />
                    </div>
                    <span> Back</span>
                  </div>
                </div>

                {/* title */}
                <div>
                  <h3 className="mx-auto mt-2 max-w-[490px] text-center text-[#2D6A4F] text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-bold font-merriweather leading-[130%]">
                    {blogDetails?.data?.title}
                  </h3>
                </div>
              </div>
            </Container>
          </div>

          {/* image */}
          <Container>
            <div className="w-full overflow-hidden -mt-[130px] lg:-mt-32 xl:-mt-28 xl:mb-10 2xl:mb-20">
              <div className="h-[220px] sm:h-[250px] lg:h-[320px] xl:h-[400px] 2xl:h-[520px] rounded-2xl lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 relative">
                <Image
                  className="w-full h-full object-cover rounded-2xl"
                  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${blogDetails?.data?.image}`}
                  fill
                  alt="banner-image"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* contents */}
        <div className="container mt-5 md:mt-10 xl:mt-0 mb-10 2xl:mb-20">
          <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            <section className="2xl:max-w-[1010px] mx-auto">
              {/* details */}
              <div
                dangerouslySetInnerHTML={{
                  __html: blogDetails?.data?.description,
                }}
                className="text-accent-gray leading-[160%]"
              />
            </section>
          </div>
        </div>
      </div>

      {/* <ShareYourRecipeSection data={shareYourRecipe} /> */}
      {/* <RecipeBlogs data={blogs} /> */}
    </div>
  );
};

export default page;
