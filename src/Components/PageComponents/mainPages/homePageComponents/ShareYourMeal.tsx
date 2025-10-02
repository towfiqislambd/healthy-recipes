import { AddLightSvg } from "@/Components/Svg/SvgContainer";
import banner from "@/Assets/images/share-recipe-bg.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "@/Components/Common/Container";

type shareMealItem = {
  description: string;
  btn_text: string;
  image: string;
};

interface shareMealProps {
  data: shareMealItem[];
}

const ShareYourMeal = ({ data }: shareMealProps) => {
  return (
    <section
      className="py-10 lg:py-20"
      style={{
        backgroundImage: `url(${banner.src})`,
        backgroundSize: "cover",
      }}
    >
      {data?.map(({ description, btn_text, image }, index) => (
        <div key={index}>
          <Container>
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-5 justify-between lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
              <div className="flex gap-5">
                <figure className="flex-shrink-0 relative">
                  <Image
                    fill
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}/${image}`}
                    alt="share image"
                  />
                </figure>
                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className="max-w-[700px] font-inter lg:text-lg xl:text-xl 2xl:text-2xl font-medium leading-[150%] text-white"
                ></div>
              </div>

              {/* share recipe button */}
              <Link
                href="/dashboard/dashboard-share-recipes"
                className="px-6 py-3 rounded-full text-white border border-white relative mt-5 flex-shrink-0"
              >
                {btn_text}
                <div className="absolute -top-2.5 left-[6px]">
                  <AddLightSvg />
                </div>
              </Link>
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
};

export default ShareYourMeal;
