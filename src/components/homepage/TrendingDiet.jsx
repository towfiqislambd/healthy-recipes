// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { SliderNextSvg, SliderPrevSvg } from '../svg-container/SvgContainer';
import banner1 from '../../assets/images/banner-5.jpg';
import banner2 from '../../assets/images/banner-6.jpg';
import banner3 from '../../assets/images/banner-7.jpg';
import banner4 from '../../assets/images/banner-1.jpg';
import banner5 from '../../assets/images/banner-2.jpg';
import banner6 from '../../assets/images/banner-3.jpg';
import banner7 from '../../assets/images/banner-4.jpg';
import RecipeCard from '../cards/RecipeCard';
import { useState } from 'react';

const TrendingDiet = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const trendingRecipesData = [
    {
      image: banner1,
      title: 'Fish and Vegetable Fry',
      views: 5172,
      rating: 4.8,
    },
    {
      image: banner2,
      title: 'Vege Salmon Fish Saute',
      views: 4389,
      rating: 4.5,
    },
    {
      image: banner3,
      title: 'Spicy Grilled Fish',
      views: 6234,
      rating: 4.9,
    },
    {
      image: banner4,
      title: 'Vegetable Stir Fry',
      views: 3287,
      rating: 4.6,
    },
    {
      image: banner5,
      title: 'Salmon and Veggie Bake',
      views: 4910,
      rating: 4.7,
    },
    {
      image: banner6,
      title: 'Seafood Pasta Delight',
      views: 5643,
      rating: 4.4,
    },
    {
      image: banner7,
      title: 'Baked Fish with Herbs',
      views: 3928,
      rating: 4.8,
    },
  ];

  return (
    <section className="py-24  bg-[#F8FCF9]">
      <div className="container">
        {/* title */}
        <div>
          <h2 className="font-merriweather text-[40px] leading-[140%] font-bold  ">
            Trending Diet Food Recipes
          </h2>
        </div>

        {/* sliders */}
        <div className="w-full">
          {/* nav buttons */}
          <div className="w-full flex items-center justify-end gap-3">
            <button
              onClick={() => swiperRef.slidePrev()}
              className="size-12 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
            >
              <SliderPrevSvg />
            </button>
            <button
              onClick={() => swiperRef.slideNext()}
              className="size-12 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
            >
              <SliderNextSvg />
            </button>
          </div>

          {/* sliders */}
          <div className="  mt-5">
            <Swiper
              loop={true}
              slidesPerView={4}
              spaceBetween={20}
              modules={[Pagination]}
              className="mySwiper"
              onSwiper={setSwiperRef}
            >
              {trendingRecipesData?.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <RecipeCard item={item} down={idx % 2 !== 0} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingDiet;
