import React from "react";
import Image from "next/image";
import Button from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";

type mealPlannerItem = {
  title: string;
  description: string;
  btn_text: string;
  image: string;
};

interface mealPlannerProps {
  data: mealPlannerItem[];
}

const OurMealPlanner = ({ data }: mealPlannerProps) => {
  console.log(data[0]?.image);
  return (
    <section className="py-7 md:py-12 2xl:py-16 3xl:py-20 bg-[#FCFCFC]">
      <Container>
        {data?.map(({ title, description, btn_text, image }, index) => (
          <div key={index} className="container">
            <div className="flex flex-col xl:flex-row items-center gap-8 xl:gap-12 3xl:gap-32 lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
              {/* Left - Contents */}
              <div className="flex-1">
                <h4 className="font-merriweather text-2xl 2xl:text-3xl 3xl:text-[40px] leading-[140%] font-bold">
                  {title}
                </h4>

                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className="space-y-3 2xl:space-y-6 mt-3 2xl:mt-5 3xl:mt-8 text-textColor leading-[150%]"
                />

                <div className="2xl:mt-10 mt-5">
                  <Button
                    path="meal-planner"
                    text={btn_text}
                    variant="primary_btn"
                  />
                </div>
              </div>

              {/* Right - Image */}
              <div className="bg-[#FDE0B8] px-6 sm:px-12 sm:py-14 py-7 rounded-lg flex-1 group overflow-hidden w-full">
                <figure className="relative w-full h-[500px]">
                  <Image
                    className="group-hover:scale-105 transition-all duration-500 rounded-md w-full"
                    fill
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}/${image}`}
                    alt="meal image"
                  />
                </figure>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default OurMealPlanner;
