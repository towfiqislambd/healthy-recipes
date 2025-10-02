"use client";
import "swiper/css";
import "swiper/css/pagination";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { SliderNextSvg, SliderPrevSvg } from "@/Components/Svg/SvgContainer";
import TestimonialCard from "@/Components/Common/TestimonialCard";
import Heading from "@/Components/Common/Heading";
import Container from "@/Components/Common/Container";

type testimonialItem = {
  title: string;
  sub_title: string;
  description: string;
  image: string;
};

interface testimonialProps {
  data: testimonialItem[];
}

const Testimonial = ({ data }: testimonialProps) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  return (
    <section className="py-7 lg:py-12 2xl:py-16 3xl:py-20 bg-[#FCFCFC] px-6 sm:px-0">
      <Container>
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <Heading text="Testimonials about us" />

          {/* Sliders */}
          <div className="w-full -mt-8">
            {/* Navigation buttons */}
            <div className="w-full flex items-center justify-end gap-3 mt-10 sm:mt-0">
              <button
                onClick={() => swiperRef?.slidePrev()}
                className="sm:size-12 size-8 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
              >
                <SliderPrevSvg />
              </button>
              <button
                onClick={() => swiperRef?.slideNext()}
                className="sm:size-12 size-8 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
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
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 20 },
                  1460: { slidesPerView: 4, spaceBetween: 20 },
                }}
              >
                {data?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <TestimonialCard item={item} />
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

export default Testimonial;
