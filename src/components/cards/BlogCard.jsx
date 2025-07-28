import { Link } from "react-router-dom";
import { ArrowTopRightSvg } from "../svg-container/SvgContainer";
import parse from "html-react-parser";

const BlogCard = ({ item }) => {
  return (
    <Link
      to={`/blog/${item?.slug}`}
      className="bg-white block rounded-lg shadow-[0px_0px_8px_0px_rgba(0,0,0,0.06)] px-3 pt-3 pb-8 group"
    >
      {/* image */}
      <div>
        <div className="w-full h-[230px] md:h-[300px] lg:h-[250px] overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover rounded-sm group-hover:scale-110 transition-all duration-300"
            src={`${import.meta.env.VITE_SITE_URL}/${item?.image}`}
            alt=""
          />
        </div>
      </div>
      {/* contents */}
      <div className="mt-6">
        <div className="w-full flex items-center justify-between">
          <h5 className="sm:leading-[20px] font-medium text-sm text-primary">
            {item?.category?.category_name} | {item?.time_ago}.
          </h5>
          <p className="leading-[20px] font-medium text-sm text-primary">
            {item?.created_date}
          </p>
        </div>
        {/* title */}
        <div className="space-y-2 mt-1">
          <h4 className="text-lg 2xl:text-xl font-bold sm:leading-[160%] font-merriweather text-black sm:truncate">
            {item?.title}
          </h4>
          <div className="text-textColor 2xl:leading-[150%] ">
            {typeof item?.description === "string"
              ? parse(item?.description.slice(0, 80))
              : item?.description}
          </div>
        </div>

        {/* user info */}
        <div className="mt-3 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10">
              <img
                className="h-full w-full object-cover rounded-full"
                src={`${import.meta.env.VITE_SITE_URL}/${item?.author_image}`}
                alt="author"
              />
            </div>
            <div>
              <h5 className="text-black font-medium leading-[140%] text-sm">
                {item?.author_name}
              </h5>
              <p className="text-textColor text-sm leading-[140%]">
                {item?.created_date}
              </p>
            </div>
          </div>

          <div className="hover:scale-110 transition-all duration-300 block">
            <ArrowTopRightSvg />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
