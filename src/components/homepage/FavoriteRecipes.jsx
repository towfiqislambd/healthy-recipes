// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { SliderNextSvg, SliderPrevSvg } from "../svg-container/SvgContainer";
import RecipeCard from "../cards/RecipeCard";
import { useState } from "react";
import { allRecipes } from "@/data/data";
import { Navigation } from "swiper/modules";
const FavoriteRecipes = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <section className="sm:py-24 pt-10 sm:pt-0 bg-[#F8FCF9]">
      <div className="container mx-auto px-4">
        {/* title */}
        <div>
          <h2 className="font-merriweather text-3xl sm:text-[40px] leading-[140%] font-bold">
            Your Favorite Recipes
          </h2>
        </div>

        {/* sliders */}
        <div className="w-full mt-5 sm:mt-0">
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
          <div className="  mt-5">
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
              {allRecipes?.map((item, index) => (
                <SwiperSlide key={index}>
                  <RecipeCard item={item} down={index % 2 !== 0} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavoriteRecipes;
