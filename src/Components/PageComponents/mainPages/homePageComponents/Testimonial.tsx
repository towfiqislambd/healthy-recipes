"use client";
import "swiper/css";
import "swiper/css/pagination";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import Heading from "@/Components/Common/Heading";
import Container from "@/Components/Common/Container";
import { SliderNextSvg, SliderPrevSvg } from "@/Components/Svg/SvgContainer";
import TestimonialCard from "@/Components/Cards/TestimonialCard";

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
        <Heading text="Testimonials about us" />

        <div className="w-full -mt-6 lg:-mt-8">
          {/* Navigation buttons */}
          <div className="w-full flex items-center justify-center lg:justify-end gap-3 mt-10 sm:mt-0">
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
      </Container>
    </section>
  );
};

export default Testimonial;
