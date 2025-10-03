import React from "react";
import { AppleSvg } from "@/Components/Svg/SvgContainer";

type testimonialItem = {
  title: string;
  sub_title: string;
  description: string;
  image: string;
};

type testimonialProps = {
  item: testimonialItem;
};

const TestimonialCard = ({ item }: testimonialProps) => {
  return (
    <div className="group">
      {/* Top section */}
      <div className="px-6 sm:px-10 py-10 md:py-12 bg-[#FF9F1C1F] rounded-[28px] relative group-hover:bg-[#FF9F1C7A] transition-all duration-300 min-h-[230px]">
        <div
          dangerouslySetInnerHTML={{ __html: item?.description }}
          className="text-black text-center"
        />
        <div className="absolute top-4 right-12 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <AppleSvg />
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <AppleSvg />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <AppleSvg />
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex items-end gap-2 -mt-5 md:-mt-8">
        <div className="size-16 md:size-20 z-10">
          <img
            className="h-full w-full object-cover rounded-full"
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.image}`}
          />
        </div>

        {/* Info */}
        <div>
          <h5 className="text-black leading-[150%]">{item?.title}</h5>
          <p className="text-sm text-textColor">{item?.sub_title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
