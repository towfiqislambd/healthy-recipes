// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Ensure this is imported
import { Pagination, Navigation } from "swiper/modules";
import { SliderNextSvg, SliderPrevSvg } from "../svg-container/SvgContainer";
import RecipeCard from "../cards/RecipeCard";
import { useState } from "react";
import { allRecipes } from "@/data/data";

const TrendingDiet = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <section className="py-24 bg-[#F8FCF9]">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-merriweather sm:text-[32px] text-2xl md:text-[40px] leading-[140%] font-bold">
            Trending Diet Food Recipes
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full flex items-center justify-center md:justify-end gap-3 mt-4">
          <button
            onClick={() => swiperRef?.slidePrev()}
            className="size-10 md:size-12 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
          >
            <SliderPrevSvg />
          </button>
          <button
            onClick={() => swiperRef?.slideNext()}
            className="size-10 md:size-12 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
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
              768: { slidesPerView: 2.5, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 35 },
            }}
          >
            {allRecipes?.map((item, idx) => (
              <SwiperSlide key={idx}>
                <RecipeCard item={item} down={idx % 2 !== 0} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TrendingDiet;
