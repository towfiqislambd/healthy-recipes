"use client";
import "swiper/css";
import React from "react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import Container from "@/Components/Common/Container";
import RecipeCard from "@/Components/Cards/RecipeCard";
import { SliderNextSvg, SliderPrevSvg } from "@/Components/Svg/SvgContainer";
import Heading from "@/Components/Common/Heading";

type trendingItem = {
  id: 1;
  recipe_name: string;
  recipe_image: string;
  age_group: string;
  serving_number: number;
  preparation_time: number;
};

interface trendingProps {
  data: trendingItem[];
}

const TrendingDiet = ({ data }: trendingProps) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  return (
    <section className="py-7 md:py-10 2xl:py-16 3xl:py-24 bg-[#F8FCF9]">
      <Container>
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* Title */}
          <Heading text="Trending Diet Food Recipes" />

          {/* Navigation Buttons */}
          <div className="w-full flex items-center justify-center md:justify-end gap-3 mt-4">
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

          {/* Swiper Slider */}
          <div className="mt-5">
            <Swiper
              onSwiper={setSwiperRef}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              modules={[Navigation]}
              pagination={{ clickable: true }}
              navigation={false}
              className="mySwiper"
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1460: { slidesPerView: 4, spaceBetween: 20 },
              }}
            >
              {data?.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <RecipeCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrendingDiet;
