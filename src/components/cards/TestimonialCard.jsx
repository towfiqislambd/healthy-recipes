import React from 'react';
import { AppleBgSvg } from '../svg-container/SvgContainer';

const TestimonialCard = ({ item }) => {
  return (
    <div className="group">
      {/* Top section */}
      <div className="px-12 py-16 bg-[#FF9F1C1F] rounded-[100px] relative group-hover:bg-[#FF9F1C7A] transition-all duration-300">
        <p className="text-black text-center">{item?.review}</p>
        <div className="absolute top-4 right-12 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <AppleBgSvg />
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <AppleBgSvg />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <AppleBgSvg />
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex items-end gap-2 -mt-8">
        <div className="size-20 z-10">
          <img
            className="h-full w-full object-cover rounded-full"
            src={item?.image}
            alt={item?.name}
          />
        </div>

        {/* Info */}
        <div>
          <h5 className="text-black leading-[150%]">{item?.name}</h5>
          <p className="text-sm text-textColor">{item?.designation}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
