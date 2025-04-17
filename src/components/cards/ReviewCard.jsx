import React from "react";
import { FullStarSvg } from "../svg-container/SvgContainer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ReviewCard = ({ data }) => {

  return (
    <div className="border border-[#8993A4] rounded-2xl 3xl:px-12 px-4 lg:px-5 py-4 lg:py-5 w-full">
      {/* top contents */}
      <div className="w-full flex items-center justify-between ">
        {/* left side content */}
        <div className="flex items-center gap-2 lg:gap-3">
          
          {/* avatar */}
          <Avatar className="size-12 lg:size-16">
            <AvatarImage className="h-full w-full rounded-full object-cover" src={data?.avatar?.avatar} alt="profile" />
            <AvatarFallback className='text-2xl font-medium'>{data?.user?.name.slice(0, 1)}</AvatarFallback>
          </Avatar>

          {/* user info */}
          <div>
            <h6 className="text-black font-medium text-lg lg:text-xl">{data?.user?.name}</h6>
            <p className="text-textColor text-sm">{data?.created_date}</p>
          </div>
        </div>

        {/* right side stars */}
        <div className="flex items-center gap-1">
          {[...Array(data?.rating || 0)].map((_, i) => (
            <FullStarSvg key={i} />
          ))}
        </div>
      </div>

      {/* review details */}
      <div className="mt-4 lg:mt-5">
        <p className="text-textColor text-sm md:text-base leading-[150%]">{data?.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
