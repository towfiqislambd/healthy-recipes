import React from "react";
import Image from "next/image";
import Button from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";

type heroBannerItem = {
  title: string;
  description: string;
  btn_text: string;
  image: string;
  image_one: string;
  image_two: string;
  image_three: string;
};

interface heroBannerProps {
  data: heroBannerItem[];
}

const Hero = ({ data }: heroBannerProps) => {
  return (
    <section className="py-7 md:py-10 2xl:py-[68px] bg-[#F6F5F2]">
      <Container>
        {data?.map(
          (
            {
              title,
              description,
              btn_text,
              image,
              image_one,
              image_two,
              image_three,
            },
            index
          ) => (
            <div key={index} className="container">
              <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 flex flex-col xl:flex-row items-center      md:gap-10 gap-7 xl:gap-16">
                {/* left side */}
                <div className="space-y-5 lg:space-y-7 3xl:space-y-10  w-full flex-1">
                  {/* Details */}
                  <div className="space-y-3 md:space-y-5">
                    <h1 className="md:max-w-[740px] w-full font-merriweather text-[20px] md:text-[24px] lg:text-[32px] 2xl:text-[40px] 3xl:text-[50px] font-bold leading-[135%] text-black">
                      <p dangerouslySetInnerHTML={{ __html: title }}></p>
                    </h1>
                    <div
                      dangerouslySetInnerHTML={{ __html: description }}
                      className="text-textColor leading-[150%] max-w-[740px] "
                    />
                  </div>

                  {/* button */}
                  <Button path="/recipe-library" text={btn_text} icon={true} />
                </div>

                {/* right side */}
                <div className="w-full xl:w-fit space-y-3 lg:space-y-5 flex-1">
                  {/* top images */}
                  <div className="w-full flex flex-col md:flex-row items-end gap-3 lg:gap-5 xl:px-10">
                    <div className="3xl:h-[320px] h-[230px] 3xl:w-[300px] w-full relative overflow-hidden rounded-lg">
                      <Image
                        className="rounded-lg h-full w-full object-cover"
                        fill
                        src={`${process.env.NEXT_PUBLIC_SITE_URL}/${image}`}
                        alt="banner"
                      />

                      {/* Overlay with Linear Gradient */}
                      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
                    </div>

                    <div className="3xl:h-[340px] h-[230px] 3xl:w-[320px] w-full overflow-hidden rounded-lg relative">
                      <Image
                        className="rounded-lg h-full w-full object-cover"
                        fill
                        src={`${process.env.NEXT_PUBLIC_SITE_URL}/${image_one}`}
                        alt="banner"
                      />
                      {/* Overlay with Linear Gradient */}
                      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
                    </div>
                  </div>

                  {/* bottom images */}
                  <div className="w-full flex flex-col md:flex-row gap-3 lg:gap-5">
                    <div className="3xl:h-[390px] h-[230px] 3xl:w-[365px] w-full relative overflow-hidden rounded-lg">
                      <Image
                        className="rounded-lg h-full w-full object-cover"
                        fill
                        src={`${process.env.NEXT_PUBLIC_SITE_URL}/${image_two}`}
                        alt="banner"
                      />
                      {/* Overlay with Linear Gradient */}
                      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
                    </div>
                    <div className="3xl:h-[360px] h-[230px] 3xl:w-[340px] w-full relative rounded-lg overflow-hidden">
                      <Image
                        className="rounded-lg h-full w-full object-cover"
                        fill
                        src={`${process.env.NEXT_PUBLIC_SITE_URL}/${image_three}`}
                        alt="banner"
                      />
                      {/* Overlay with Linear Gradient */}
                      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </Container>
    </section>
  );
};

export default Hero;
