const LeftSideContentsDetailsPage = () => {
  return (
    <div className="mt-5 bg-white rounded-lg h-full xl:max-w-[420px] p-5">
      {/* Ingredients */}
      <div>
        {/* title */}
        <h5 className="text-black text-xl 2xl:text-2xl font-bold leading-[130%] font-merriweather">
          Ingredients:
        </h5>

        {/* description */}
        <div className="mt-4 lg:mt-5 2xl:mt-8 space-y-4 2xl:space-y-5">
          <p className="text-textColor leading-[130%]">
            Ripe bananas (the ripper the better)
          </p>
          <p className="text-textColor leading-[130%]">
            Egg whites (1 or 2 eggs)
          </p>
          <p className="text-textColor leading-[130%]">Rolled oats</p>
          <p className="text-textColor leading-[130%]">
            Cinnamon powder (a little bit)
          </p>
          <p className="text-textColor leading-[130%]">Baking powder</p>
          <p className="text-textColor leading-[130%]">Salt</p>
          <p className="text-textColor leading-[130%]">
            Optional - add your favorite mix-ins like chopped walnuts or maybe
            some chocolate chips!
          </p>
          <p className="text-textColor leading-[130%]">
            Coconut oil (using cooking spray)
          </p>
        </div>
      </div>

      {/* stats */}
      <div className="mt-7 lg:mt-10 space-y-3 2xl:space-y-4">
        <div className="w-full flex items-center justify-between">
          <p className="text-textColor">Serving number</p>
          <p className="text-black font-medium">4</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-textColor">Cooking time</p>
          <p className="text-black font-medium">30 Min.</p>
        </div>
      </div>

      {/* Nutrition */}
      <div className="pt-7 lg:pt-8">
        {/* title */}
        <h5 className="text-black text-xl 2xl:text-2xl font-bold leading-[130%] font-merriweather">
          Nutrition:
        </h5>

        {/* description */}
        <div className="mt-5 2xl:mt-8 space-y-5">
          <p className="text-textColor leading-[130%]">
            Calories: 100-150 calories
          </p>
          <p className="text-textColor leading-[130%]">Fat: 7-12 grams</p>
          <p className="text-textColor leading-[130%]">
            Sodium: 100-300 milligrams
          </p>
          <p className="text-textColor leading-[130%]">
            Carbohydrates: 5-10 grams
          </p>
          <p className="text-textColor leading-[130%]">Fiber: 1-3 grams</p>
          <p className="text-textColor leading-[130%]">Protein: 4-7 grams</p>
        </div>
      </div>

      {/* Tags */}
      <div className="pt-8">
        {/* title */}
        <h5 className="text-black text-xl 2xl:text-2xl font-bold leading-[130%] font-merriweather">
          Tags:
        </h5>

        {/* description */}
        <div className="mt-5 2xl:mt-8 flex items-center flex-wrap gap-3">
          <div className="bg-[#EFEFEF] px-2 py-1 rounded-sm w-fit text-textColor">
            Dairy free food
          </div>
          <div className="bg-[#EFEFEF] px-2 py-1 rounded-sm w-fit text-textColor">
            Dairy free food
          </div>
          <div className="bg-[#EFEFEF] px-2 py-1 rounded-sm w-fit text-textColor">
            Dairy free food
          </div>
          <div className="bg-[#EFEFEF] px-2 py-1 rounded-sm w-fit text-textColor">
            Dairy free food
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideContentsDetailsPage;
