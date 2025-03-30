// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { SliderNextSvg, SliderPrevSvg } from "../svg-container/SvgContainer";
import { useState } from "react";
import BlogCard from "../cards/BlogCard";
import { allBlogs } from "@/data/data";
import { Navigation } from "swiper/modules";

const RecipeBlogs = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <section className="py-24 bg-[#F8FCF9] px-3 sm:px-0">
      <div className="container">
        {/* title */}
        <div>
          <h2 className="font-merriweather text-3xl sm:text-[40px] leading-[140%] font-bold  ">
            Recipe Blogs & Tips
          </h2>
        </div>

        {/* sliders */}
        <div className="w-full">
          {/* nav buttons */}
          <div className="w-full flex items-center justify-end gap-3">
            <button
              onClick={() => swiperRef.slidePrev()}
              className="sm:size-12 size-8 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
            >
              <SliderPrevSvg />
            </button>
            <button
              onClick={() => swiperRef.slideNext()}
              className="sm:size-12 size-8 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
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
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 25 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1280: { slidesPerView: 4, spaceBetween: 35 },
              }}
            >
              {allBlogs?.map((item) => (
                <SwiperSlide key={item?.id}>
                  <BlogCard data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeBlogs;
