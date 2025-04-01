import avatar1 from "../../assets/images/avatar-1.jpg";
import avatar2 from "../../assets/images/avatar-2.jpg";
import { useState } from "react";
import TestimonialCard from "../cards/TestimonialCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { SliderNextSvg, SliderPrevSvg } from "../svg-container/SvgContainer";
import SectionTitle from "../common/SectionTitle";

const Testimonials = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  const testimonialsData = [
    {
      image: avatar1,
      review:
        "I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs.",
      name: "Sarah Jamil",
      designation: "Freelancer",
    },
    {
      image: avatar2,
      review:
        "I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs.",
      name: "John Doe",
      designation: "Businessman",
    },
    {
      image: avatar1,
      review:
        "I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs. ",
      name: "Sarah Jamil",
      designation: "Freelancer",
    },
    {
      image: avatar2,
      review:
        "I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs. ",
      name: "John Doe",
      designation: "Businessman",
    },
    {
      image: avatar1,
      review:
        "I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs.",
      name: "Sarah Jamil",
      designation: "Freelancer",
    },
    {
      image: avatar2,
      review:
        "I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs.",
      name: "John Doe",
      designation: "Businessman",
    },
    {
      image: avatar1,
      review:
        "I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs. ",
      name: "Sarah Jamil",
      designation: "Freelancer",
    },
    {
      image: avatar2,
      review:
        "I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs. ",
      name: "John Doe",
      designation: "Businessman",
    },
  ];

  return (
    <section className="sm:py-24 bg-[#FCFCFC] px-6 sm:px-0">
      <div className="container">
        <SectionTitle title="Testimonials about us" />

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
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 25 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1280: { slidesPerView: 4, spaceBetween: 35 },
              }}
            >
              {testimonialsData?.map((item, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
