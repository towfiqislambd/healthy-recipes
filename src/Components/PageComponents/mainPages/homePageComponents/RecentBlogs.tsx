"use client";
import "swiper/css";
import "swiper/css/pagination";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import BlogCard from "@/Components/Cards/BlogCard";
import Container from "@/Components/Common/Container";
import { SliderNextSvg, SliderPrevSvg } from "@/Components/Svg/SvgContainer";

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

interface blogProps {
  data: blogItem[];
}

const RecentBlogs = ({ data }: blogProps) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  return (
    <section className="py-10 2xl:py-16 3xl:py-20 bg-[#F8FCF9]">
      <Container>
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* Title */}
          <h2 className="font-merriweather text-[22px] md:text-[24px] lg:text-[28px] 2xl:text-[32px] leading-[140%] font-bold">
            Recipe Blogs & Tips
          </h2>

          {/* Slider */}
          <div className="w-full">
            {/* Nav buttons */}
            <div className="w-full flex items-center justify-end gap-3">
              <button
                onClick={() => swiperRef?.slidePrev()}
                className="size-10 lg:size-12 flex items-center justify-center border border-primary-orange rounded-full hover:bg-primary-orange transition-all duration-300 group"
              >
                <SliderPrevSvg />
              </button>

              <button
                onClick={() => swiperRef?.slideNext()}
                className="size-10 lg:size-12 flex items-center justify-center border border-primary-orange rounded-full hover:bg-primary-orange transition-all duration-300 group"
              >
                <SliderNextSvg />
              </button>
            </div>

            {/* Swiper */}
            <div className="mt-5">
              <Swiper
                onSwiper={setSwiperRef}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 25 },
                  768: { slidesPerView: 2, spaceBetween: 25 },
                  1024: { slidesPerView: 3, spaceBetween: 25 },
                  1460: { slidesPerView: 4, spaceBetween: 25 },
                }}
              >
                {data?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <BlogCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RecentBlogs;
