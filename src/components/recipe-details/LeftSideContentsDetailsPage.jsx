import parse from 'html-react-parser';

const LeftSideContentsDetailsPage = ({ data }) => {
  return (
    <div className="3xl:mt-5 bg-white rounded-lg h-full p-5">
      {/* Ingredients */}
      <div>
        {/* title */}
        <h5 className="text-black text-lg sm:text-xl 2xl:text-2xl font-bold 2xl:leading-[130%] font-merriweather">
          Ingredients:
        </h5>

        {/* description */}
        <div className="mt-4 lg:mt-5 2xl:mt-8 space-y-3 2xl:space-y-5">
          {
            data?.ingredients.map(item => <li key={item.id} className="text-textColor leading-[130%]">
              {typeof item?.ingredient_name === 'string' ? parse(item?.ingredient_name) : item?.ingredient_name}
            </li>)
          }
        </div>
      </div>

      {/* stats */}
      <div className="mt-5 sm:mt-8 2xl:mt-10 space-y-2 text-[15px] sm:text-base sm:space-y-3 2xl:space-y-4">
        <div className="w-full flex items-center justify-between">
          <p className="text-textColor">Serving number</p>
          <p className="text-black font-medium">{data?.serving_number}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-textColor">Preparation time</p>
          <p className="text-black font-medium">{data?.preparation_time}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-textColor">Cooking time</p>
          <p className="text-black font-medium">{data?.cooking_time}</p>
        </div>
      </div>

      {/* Nutrition */}
      <div className="pt-5 sm:pt-7 lg:pt-8">
        {/* title */}
        <h5 className="text-black text-lg sm:text-xl 2xl:text-2xl font-bold 2xl:leading-[130%] font-merriweather">
          Nutrition:
        </h5>

        {/* description */}
        <div className="mt-3 2xl:mt-8 space-y-3 2xl:space-y-5 text-textColor leading-7 2xl:leading-10">
          {
            typeof data?.nutritions === 'string' || typeof data?.nutrition_info === 'string'
              ? parse(data.nutritions || data.nutrition_info)
              :
              data?.nutritions || data?.nutrition_info
          }
        </div>
      </div>

      {/* Tags */}
      <div className="pt-5 sm:pt-8">
        {/* title */}
        <h5 className="text-black text-lg sm:text-xl 2xl:text-2xl font-bold leading-[130%] font-merriweather">
          Tags:
        </h5>

        {/* description */}
        <div className="mt-5 2xl:mt-8 flex items-center flex-wrap gap-3">
          {
            data?.tag_names
              ?
              data?.tag_names?.map(item => <div key={item.id} className="bg-[#EFEFEF] px-2 py-1 rounded-sm w-fit text-textColor">
                {item?.tag_name}
              </div>)
              :
              data?.tags?.map(item => <div key={item.id} className="bg-[#EFEFEF] px-2 py-1 rounded-sm w-fit text-textColor">
                {item?.tag_name}
              </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default LeftSideContentsDetailsPage;
