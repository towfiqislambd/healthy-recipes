"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Container from "@/Components/Common/Container";
import { BackArrowSvg } from "@/Components/Svg/SvgContainer";

interface blogProps {
  data: {
    title: string;
  };
}

const UpperBlog = ({ data }: blogProps) => {
  const router = useRouter();

  return (
    <div className="bg-[#B7E4C7] pt-5 lg:pt-10 3xl:pt-16 pb-40 ">
      <Container>
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#373E85] group cursor-pointer"
          >
            <span className="group-hover:-translate-x-1 duration-300 transition-all">
              <BackArrowSvg />
            </span>
            <span>Back</span>
          </button>

          {/* Blog Title */}
          <h3 className="mx-auto mt-2 max-w-[490px] text-center text-[#2D6A4F] text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-bold font-merriweather leading-[130%]">
            {data?.title}
          </h3>
        </div>
      </Container>
    </div>
  );
};

export default UpperBlog;
