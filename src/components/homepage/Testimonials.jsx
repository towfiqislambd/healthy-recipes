import avatar1 from '../../assets/images/avatar-1.jpg';
import avatar2 from '../../assets/images/avatar-2.jpg';
import { useState } from 'react';
import TestimonialCard from '../cards/TestimonialCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { SliderNextSvg, SliderPrevSvg } from '../svg-container/SvgContainer';
import SectionTitle from '../common/SectionTitle';

const Testimonials = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  const testimonialsData = [
    {
      image: avatar1,
      review:
        'I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs.',
      name: 'Sarah Jamil',
      designation: 'Freelancer',
    },
    {
      image: avatar2,
      review:
        'I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs.',
      name: 'John Doe',
      designation: 'Businessman',
    },
    {
      image: avatar1,
      review:
        'I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs. ',
      name: 'Sarah Jamil',
      designation: 'Freelancer',
    },
    {
      image: avatar2,
      review:
        'I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs. ',
      name: 'John Doe',
      designation: 'Businessman',
    },
    {
      image: avatar1,
      review:
        'I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs.',
      name: 'Sarah Jamil',
      designation: 'Freelancer',
    },
    {
      image: avatar2,
      review:
        'I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs.',
      name: 'John Doe',
      designation: 'Businessman',
    },
    {
      image: avatar1,
      review:
        'I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs. ',
      name: 'Sarah Jamil',
      designation: 'Freelancer',
    },
    {
      image: avatar2,
      review:
        'I love that this site tailors recipes by age! It’s a lifesaver for finding nutritious meals my kids enjoy while meeting my own dietary needs. ',
      name: 'John Doe',
      designation: 'Businessman',
    },
  ];

  return (
    <section className="py-24 bg-[#FCFCFC]">
      <div className="container">
        <SectionTitle title="Testimonials about us" />

        {/* Sliders */}
        <div className="w-full -mt-8">
          {/* Navigation buttons */}
          <div className="w-full flex items-center justify-end gap-3">
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="size-12 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
            >
              <SliderPrevSvg />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              className="size-12 flex items-center justify-center border border-primary rounded-full hover:bg-primary transition-all duration-300 group"
            >
              <SliderNextSvg />
            </button>
          </div>

          {/* Swiper */}
          <div className="mt-5">
            <Swiper
              loop={true}
              slidesPerView={4}
              spaceBetween={20}
              modules={[Pagination]}
              className="mySwiper"
              onSwiper={setSwiperRef}
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
