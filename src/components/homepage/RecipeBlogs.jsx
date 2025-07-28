import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import {
  SliderNextSvg,
  SliderPrevSvg,
} from "@/components/svg-container/SvgContainer";
import BlogCard from "@/components/cards/BlogCard";

const RecipeBlogs = ({ data }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <section className="py-10 2xl:py-16 3xl:py-20  bg-[#F8FCF9]">
      <div className="container">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* title */}
          <div>
            <h2 className="font-merriweather text-[22px] md:text-[24px] lg:text-[28px] 2xl:text-[32px] leading-[140%] font-bold">
              Recipe Blogs & Tips
            </h2>
          </div>

          {/* sliders */}
          <div className="w-full">
            {/* nav buttons */}
            <div className="w-full flex items-center justify-end gap-3">
              <button
                onClick={() => swiperRef.slidePrev()}
                className="size-10 lg:size-12 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
              >
                <SliderPrevSvg />
              </button>
              <button
                onClick={() => swiperRef.slideNext()}
                className="size-10 lg:size-12 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
              >
                <SliderNextSvg />
              </button>
            </div>

            {/* sliders */}
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
      </div>
    </section>
  );
};

export default RecipeBlogs;
