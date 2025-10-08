import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { FullStarSvg } from "@/Components/Svg/SvgContainer";

type ReviewItem = {
  item: {
    id: number;
    user: {
      avatar: string;
      name: string;
    };
    rating: number;
    comment: string;
    created_date: string;
  };
};

const ReviewCard = ({ item }: ReviewItem) => {
  return (
    <div className="border border-gray-200 rounded-2xl px-3 md:px-4 2xl:px-5 3xl:px-7 py-3.5 lg:py-5 w-full">
      <div className="w-full flex items-center justify-between ">
        {/* Left */}
        <div className="flex items-center gap-2 3xl:gap-3">
          {/* Avatar */}
          <Avatar className="size-10 lg:size-12 2xl:size-16">
            <AvatarImage
              className="h-full w-full rounded-full object-cover"
              src={item?.user?.avatar}
              alt="profile"
            />
            <AvatarFallback className="text-lg lg:text-2xl font-medium">
              {item?.user?.name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div>
            <h6 className="text-black font-medium text-sm md:text-base lg:text-lg 3xl:text-xl">
              {item?.user?.name}
            </h6>
            <p className="text-textColor text-sm">{item?.created_date}</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 shrink-0">
          {[...Array(item?.rating || 0)].map((_, i) => (
            <FullStarSvg key={i} />
          ))}
        </div>
      </div>

      {/* Review Description */}
      <p className="text-textColor text-sm 2xl:text-base leading-[150%] mt-3 3xl:mt-5">
        {item?.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
