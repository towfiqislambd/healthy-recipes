import React from 'react';

const MealPlannerStatsCard = ({ item }) => {
  return (
    <div className="flex items-end gap-2 justify-center">
      <div className="size-8 flex items-center justify-center bg-[#CFEDD9] rounded-full">
        {item?.id}
      </div>
      <div className="flex flex-col items-center gap-1">
        {item?.svg}
        <h5 className="text-[#253858] text-xl font-medium leading-[150%]">
          {item?.title}
        </h5>
      </div>
    </div>
  );
};

export default MealPlannerStatsCard;
