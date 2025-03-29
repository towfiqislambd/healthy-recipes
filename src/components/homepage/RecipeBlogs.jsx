// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { SliderNextSvg, SliderPrevSvg } from '../svg-container/SvgContainer';
import { useState } from 'react';
import BlogCard from '../cards/BlogCard';
import { allBlogs } from '@/data/data';

const RecipeBlogs = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <section className="py-24 bg-[#F8FCF9]">
      <div className="container">
        {/* title */}
        <div>
          <h2 className="font-merriweather text-[40px] leading-[140%] font-bold  ">
            Recipe Blogs & Tips
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
