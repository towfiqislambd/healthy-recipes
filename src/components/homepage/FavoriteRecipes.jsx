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
    <section className="py-7 md:py-10 2xl:py-16 3xl:py-20 bg-[#F8FCF9]">
      <div className="container">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* title */}
          <div>
            <h2 className="font-merriweather text-[22px] md:text-[24px] lg:text-[28px] 2xl:text-[32px] leading-[140%] font-bold">
              Your Favorite Recipes
            </h2>
          </div>

          {/* sliders */}
          <div className="w-full mt-5 sm:mt-0">
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
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 20 },
                  1460: { slidesPerView: 4, spaceBetween: 20 },
                }}
              >
                {allRecipes?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <RecipeCard item={item} down={index % 2 !== 0} isMyRecipe={true} />
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

export default FavoriteRecipes;
