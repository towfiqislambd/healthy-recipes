import React from 'react';

const MealPlannerStatsCard = ({ item }) => {
  return (
    <div className="flex items-end gap-2 justify-center">
      <div className="size-6 text-sm xl:text-base xl:size-8 flex items-center flex-shrink-0 justify-center bg-[#CFEDD9] rounded-full">
        {item?.id}
      </div>
      <div className="flex flex-col items-center gap-1">
        {item?.svg}
        <h5 className="text-[#253858] md:text-lg 3xl:text-xl font-medium leading-[150%]">
          {item?.title}
        </h5>
      </div>
    </div>
  );
};

export default MealPlannerStatsCard;
