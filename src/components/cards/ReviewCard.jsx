import React from 'react';
import { EmptyStarSvg, FullStarSvg } from '../svg-container/SvgContainer';

const ReviewCard = ({ data }) => {
  const fullStars = Array(data?.reviewCount).fill(<FullStarSvg />);
  const emptyStars = Array(5 - data?.reviewCount).fill(<EmptyStarSvg />);
  return (
    <div className="border border-[#8993A4] rounded-2xl px-12 py-5 w-full">
      {/* top contents */}
      <div className="w-full flex items-center justify-between ">
        {/* left side content */}
        <div className="flex items-center gap-3">
          {/* avatar */}
          <div className="size-16">
            <img
              className="h-full w-full rounded-full object-cover"
              src={data?.image}
              alt=""
            />
          </div>
          {/* user info */}
          <div>
            <h6 className="text-black font-medium text-xl">{data?.name}</h6>
            <p className="text-textColor text-sm">{data?.date}</p>
          </div>
        </div>

        {/* right side stars */}
        <div className="flex items-center gap-1">
          {/* Render full stars */}
          {fullStars.map((star, index) => (
            <span key={`full-${index}`}>{star}</span>
          ))}

          {/* Render empty stars */}
          {emptyStars.map((star, index) => (
            <span key={`empty-${index}`}>{star}</span>
          ))}
        </div>
      </div>

      {/* review details */}
      <div className="mt-5">
        <p className="text-textColor leading-[150%]">{data?.review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
