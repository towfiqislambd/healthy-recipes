import Container from "@/Components/Common/Container";
import Heading from "@/Components/Common/Heading";
import Image from "next/image";
import React from "react";

type whyChooseItem = {
  title: string;
  description: string;
  image: string;
};

interface whyChooseProps {
  data: whyChooseItem[];
}

const WhyChooseUs = ({ data }: whyChooseProps) => {
  return (
    <section className="2xl:py-20 py-8 md:py-12 bg-[#FCFCFC]">
      <Container>
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* section title */}
          <Heading text="Why Choose Us" />

          {/* contents */}
          <div className="mt-5 lg:mt-7 3xl:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-12 px-5 sm:px-0">
            {data?.map(({ title, description, image }, index) => (
              <div key={index} className="w-full sm:space-y-4 space-y-2">
                <div className="flex items-center gap-2 justify-center w-full">
                  <figure className="relative size-10">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}/${image}`}
                      alt="image"
                      fill
                    />
                  </figure>
                  <h5 className="text-xl 3xl:text-3xl leading-[140%] text-primary-orange font-merriweather">
                    {title}
                  </h5>
                </div>
                <p className="leading-[150%] text-textColor text-center">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
