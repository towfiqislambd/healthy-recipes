"use client";
import "swiper/css";
import "swiper/css/pagination";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import BlogCard from "@/Components/Cards/BlogCard";
import Container from "@/Components/Common/Container";
import Heading from "@/Components/Common/Heading";
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
        {/* Title */}
        <Heading text="Recipe Blogs & Tips" />

        {/* Slider */}
        <div className="w-full">
          {/* Nav buttons */}
          <div className="w-full mt-3 flex items-center justify-center lg:justify-end gap-3">
            <button
              className="swiper_btn"
              onClick={() => swiperRef?.slidePrev()}
            >
              <SliderPrevSvg />
            </button>

            <button
              className="swiper_btn"
              onClick={() => swiperRef?.slideNext()}
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
              speed={800}
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
      </Container>
    </section>
  );
};

export default RecentBlogs;
